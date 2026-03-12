import { Progress } from "@heroui/react";

export default function PreloaderBar() {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Cargando..."
      className="max-w-md"
      style={{color:"#AE7EDE"}}
    />
  );
}