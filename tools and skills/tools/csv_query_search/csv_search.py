"""
CSV Query Search Tool
=====================
Search, filter, and query CSV data files (AI Engineer talks, speakers, topics, transcripts).
Designed to be used by any agent or human to find relevant information from collected data.

Usage:
    python csv_search.py --query "agent harness" --file aie-talks.csv --field summary
    python csv_search.py --query "memory" --file aie-talks.csv --field title --top 20
    python csv_search.py --list-fields --file aie-talks.csv
    python csv_search.py --list-topics --file aie-topics.csv
    python csv_search.py --query "Anthropic" --file aie-speakers.csv --field organization
    python csv_search.py --query "harness" --all-files --data-dir /path/to/csvs
"""

import argparse
import csv
import json
import os
import re
import sys
from pathlib import Path
from typing import List, Dict, Optional

# Force UTF-8 output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Default data directory — the AI Engineer CSV files
DEFAULT_DATA_DIR = str(Path(__file__).parent.parent.parent / "PI AGENT LEARNING" / "Youtube and Learning matarials" / "AI engineerinng Youtube Channel")


def load_csv(filepath: str) -> List[Dict[str, str]]:
    """Load a CSV file and return as list of dicts."""
    rows = []
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(dict(row))
    return rows


def search_rows(rows: List[Dict], query: str, field: Optional[str] = None,
                case_insensitive: bool = True) -> List[Dict]:
    """Search rows for a query string, optionally in a specific field."""
    results = []
    pattern = re.compile(re.escape(query), re.IGNORECASE if case_insensitive else 0)

    for row in rows:
        if field:
            val = row.get(field, '')
            if pattern.search(val):
                results.append(row)
        else:
            # Search across all fields
            for val in row.values():
                if pattern.search(str(val)):
                    results.append(row)
                    break
    return results


def list_fields(filepath: str) -> List[str]:
    """List all column names in a CSV file."""
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.DictReader(f)
        return list(reader.fieldnames or [])


def extract_topics(filepath: str) -> List[str]:
    """Extract unique topic names from aie-topics.csv."""
    rows = load_csv(filepath)
    topics = set()
    for row in rows:
        # The topics CSV has a 'name' field typically
        for key in ['name', 'slug', 'topic']:
            if key in row and row[key]:
                topics.add(row[key])
    return sorted(topics)


def format_talk_result(row: Dict, index: int) -> str:
    """Format a single talk result for display."""
    lines = [f"\n{'='*60}"]
    lines.append(f"  [{index}] {row.get('title', 'N/A')}")
    lines.append(f"  Event: {row.get('event', 'N/A')}")
    lines.append(f"  URL: {row.get('url', 'N/A')}")

    speakers = row.get('speakers', '')
    if speakers:
        try:
            spk_list = json.loads(speakers)
            names = [s.get('name', '') for s in spk_list if s.get('name')]
            lines.append(f"  Speakers: {', '.join(names)}")
        except (json.JSONDecodeError, TypeError):
            lines.append(f"  Speakers: {speakers}")

    topics = row.get('topics', '')
    if topics:
        try:
            top_list = json.loads(topics)
            names = [t.get('name', '') for t in top_list if t.get('name')]
            lines.append(f"  Topics: {', '.join(names)}")
        except (json.JSONDecodeError, TypeError):
            lines.append(f"  Topics: {topics}")

    summary = row.get('summary', '')
    if summary:
        # Truncate long summaries
        if len(summary) > 300:
            summary = summary[:300] + '...'
        lines.append(f"  Summary: {summary}")

    return '\n'.join(lines)


def format_speaker_result(row: Dict, index: int) -> str:
    """Format a single speaker result for display."""
    lines = [f"\n{'='*60}"]
    lines.append(f"  [{index}] {row.get('name', 'N/A')}")
    lines.append(f"  Title: {row.get('jobTitle', 'N/A')}")
    lines.append(f"  Organization: {row.get('organization', 'N/A')}")
    lines.append(f"  URL: {row.get('url', 'N/A')}")

    talk_slugs = row.get('talkSlugs', '')
    if talk_slugs:
        try:
            slugs = json.loads(talk_slugs)
            lines.append(f"  Talks ({len(slugs)}): {', '.join(slugs[:5])}")
            if len(slugs) > 5:
                lines.append(f"    ... and {len(slugs)-5} more")
        except (json.JSONDecodeError, TypeError):
            pass

    return '\n'.join(lines)


def format_generic_result(row: Dict, index: int) -> str:
    """Format any row generically."""
    lines = [f"\n{'='*60}"]
    lines.append(f"  [{index}]")
    for key, val in row.items():
        if val and len(str(val)) < 200:
            lines.append(f"  {key}: {val}")
        elif val:
            lines.append(f"  {key}: {str(val)[:200]}...")
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="CSV Query Search Tool — Search AI Engineer talks, speakers, topics, and transcripts",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python csv_search.py --query "agent harness" --file aie-talks.csv --field summary
  python csv_search.py --query "memory" --file aie-talks.csv --top 10
  python csv_search.py --list-fields --file aie-talks.csv
  python csv_search.py --query "Anthropic" --file aie-speakers.csv --field organization
  python csv_search.py --query "RAG" --all-files
  python csv_search.py --stats --file aie-talks.csv
        """
    )

    parser.add_argument("--query", "-q", type=str, help="Search query string")
    parser.add_argument("--file", "-f", type=str, help="CSV filename to search (e.g., aie-talks.csv)")
    parser.add_argument("--field", type=str, help="Specific field/column to search in")
    parser.add_argument("--top", type=int, default=10, help="Max results to show (default: 10)")
    parser.add_argument("--data-dir", type=str, default=DEFAULT_DATA_DIR, help="Directory containing CSV files")
    parser.add_argument("--all-files", action="store_true", help="Search across all CSV files in data-dir")
    parser.add_argument("--list-fields", action="store_true", help="List all fields in a CSV file")
    parser.add_argument("--list-topics", action="store_true", help="List all unique topics")
    parser.add_argument("--stats", action="store_true", help="Show stats about a CSV file")
    parser.add_argument("--output", "-o", type=str, help="Output results to file (json)")
    parser.add_argument("--case-sensitive", action="store_true", help="Case-sensitive search")

    args = parser.parse_args()

    data_dir = Path(args.data_dir)

    if not data_dir.exists():
        print(f"[ERROR] Data directory not found: {data_dir}")
        sys.exit(1)

    # List fields mode
    if args.list_fields:
        if not args.file:
            print("[ERROR] --file is required with --list-fields")
            sys.exit(1)
        filepath = data_dir / args.file
        fields = list_fields(str(filepath))
        print(f"\nFields in {args.file}:")
        for i, f_name in enumerate(fields, 1):
            print(f"  {i}. {f_name}")
        return

    # List topics mode
    if args.list_topics:
        filepath = data_dir / (args.file or "aie-topics.csv")
        topics = extract_topics(str(filepath))
        print(f"\nUnique topics ({len(topics)}):")
        for t in topics:
            print(f"  • {t}")
        return

    # Stats mode
    if args.stats:
        if not args.file:
            # Show stats for all files
            csv_files = list(data_dir.glob("*.csv"))
            print(f"\nCSV Files in {data_dir}:")
            for cf in csv_files:
                rows = load_csv(str(cf))
                fields = list_fields(str(cf))
                print(f"  {cf.name}: {len(rows)} rows, {len(fields)} fields")
        else:
            filepath = data_dir / args.file
            rows = load_csv(str(filepath))
            fields = list_fields(str(filepath))
            print(f"\nStats for {args.file}:")
            print(f"  Rows: {len(rows)}")
            print(f"  Fields: {', '.join(fields)}")
        return

    # Search mode
    if not args.query:
        parser.print_help()
        return

    all_results = []

    if args.all_files:
        csv_files = list(data_dir.glob("*.csv"))
        for cf in csv_files:
            rows = load_csv(str(cf))
            results = search_rows(rows, args.query, args.field,
                                  not args.case_sensitive)
            for r in results:
                r['_source_file'] = cf.name
            all_results.extend(results)
            if results:
                print(f"\n[{cf.name}] {len(results)} matches")
    else:
        if not args.file:
            args.file = "aie-talks.csv"  # default
        filepath = data_dir / args.file
        if not filepath.exists():
            print(f"[ERROR] File not found: {filepath}")
            sys.exit(1)
        rows = load_csv(str(filepath))
        all_results = search_rows(rows, args.query, args.field,
                                  not args.case_sensitive)

    # Display results
    print(f"\n{'='*60}")
    print(f"  Query: '{args.query}'")
    print(f"  Results: {len(all_results)} matches (showing top {args.top})")
    print(f"{'='*60}")

    for i, row in enumerate(all_results[:args.top], 1):
        source = row.pop('_source_file', args.file or '')
        if source and 'talks' in source:
            print(format_talk_result(row, i))
        elif source and 'speakers' in source:
            print(format_speaker_result(row, i))
        else:
            print(format_generic_result(row, i))

    if len(all_results) > args.top:
        print(f"\n... {len(all_results) - args.top} more results not shown. Use --top {len(all_results)} to see all.")

    # Output to file
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(all_results[:args.top], f, indent=2, ensure_ascii=False)
        print(f"\nResults saved to {args.output}")


if __name__ == "__main__":
    main()
