import logging
import sys
from pathlib import Path

# Add parent to sys path so we can import config
sys.path.insert(0, str(Path(__file__).parent.parent))
import config

# Create logs directory if it doesn't exist
log_dir = config.RESEARCH_RAW_ROOT / "apps" / "youtube-harvester" / "logs"
log_dir.mkdir(parents=True, exist_ok=True)

class ANSIColors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class ColorFormatter(logging.Formatter):
    def format(self, record):
        if record.levelno == logging.INFO:
            record.msg = f"{ANSIColors.OKGREEN}{record.msg}{ANSIColors.ENDC}"
        elif record.levelno == logging.WARNING:
            record.msg = f"{ANSIColors.WARNING}{record.msg}{ANSIColors.ENDC}"
        elif record.levelno == logging.ERROR:
            record.msg = f"{ANSIColors.FAIL}{record.msg}{ANSIColors.ENDC}"
        elif record.levelno == logging.DEBUG:
            record.msg = f"{ANSIColors.OKCYAN}{record.msg}{ANSIColors.ENDC}"
        return super().format(record)

def get_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    if not logger.handlers:
        # Console handler
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)
        ch.setFormatter(ColorFormatter('%(asctime)s - %(message)s', '%H:%M:%S'))

        # File handler
        fh = logging.FileHandler(log_dir / "harvester.log")
        fh.setLevel(logging.DEBUG)
        fh.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

        logger.addHandler(ch)
        logger.addHandler(fh)

    return logger

log = get_logger("harvester")
