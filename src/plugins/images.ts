import type { App, DirectiveBinding } from "vue";

const handleImage = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding): void {
    loadAndSetImage(el, binding.value);
  },
  updated(el: HTMLImageElement, binding: DirectiveBinding): void {
    if (binding.value !== binding.oldValue) {
      loadAndSetImage(el, binding.value);
    }
  },
};

function loadAndSetImage(el: HTMLImageElement, src: string): void {
  const srcDefault = "/placeholder.png";

  let img = new Image() as HTMLImageElement | null;
  if (!img) return;
  img.style.objectFit = "cover";
  img.src = src ?? srcDefault;
  img.onload = () => {
    el.src = img!.src;
    img = null;
  };

  // Thiết lập src của hình ảnh là đường dẫn của ảnh mặc định
  el.src = srcDefault;
}

export default {
  install: (app: App): void => {
    app.directive("image", handleImage);
  },
};
