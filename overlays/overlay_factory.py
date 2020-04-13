
from . import detection_overlay
from . import classification_overlay


class EmptyOverlay:
  """ Class for empty overlay."""
  def apply_overlay(self, image_bytes, feature):
    return image_bytes


overlay_map = {
  'detection': detection_overlay.DetectionOverlay,
  'classification': classification_overlay.ClassificationOverlay,
  'none': EmptyOverlay
}

def get_overlay(name, args):
  """ Returns overlay object (by name) initialized by arguments args from tfviewer.py.
  
  Args:
      name (str): Name of the image overlay.
      args
  """
  return overlay_map[name](args)