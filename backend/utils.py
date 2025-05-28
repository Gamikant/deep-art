import torch
from PIL import Image
import io
import torchvision.transforms as transforms
import re

# Import or define TransformerNet here
from transformer_net import TransformerNet  # Make sure this file exists

def stylize_image(image_file, model_path):
    input_image = Image.open(image_file).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize(512),
        transforms.CenterCrop(512),
        transforms.ToTensor(),
        transforms.Lambda(lambda x: x.mul(255))
    ])
    image_tensor = transform(input_image).unsqueeze(0)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    style_model = TransformerNet()
    state_dict = torch.load(model_path, map_location=device)
    # Remove deprecated running_* keys in InstanceNorm from the checkpoint
    for k in list(state_dict.keys()):
        if re.search(r'in\d+\.running_(mean|var)$', k):
            del state_dict[k]
    style_model.load_state_dict(state_dict)
    style_model.to(device)
    style_model.eval()

    with torch.no_grad():
        output = style_model(image_tensor.to(device)).clamp(0, 255)
    output = output.squeeze().cpu().numpy().transpose(1, 2, 0).astype("uint8")
    output_image = Image.fromarray(output)
    img_bytes = io.BytesIO()
    output_image.save(img_bytes, format='PNG')
    img_bytes.seek(0)
    return img_bytes.read()
