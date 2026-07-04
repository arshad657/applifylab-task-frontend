import Image from "next/image";
import shape1 from "@/src/assets/icons/shape1.svg";
import shape2 from "@/src/assets/icons/shape2.svg";
import shape3 from "@/src/assets/icons/shape3.svg";

export function DecorativeShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Shape one */}
      <Image
        src={shape1}
        alt="Shape One"
        className="absolute -top-6"
        priority
      />

      {/* Shape two */}
      <Image
        src={shape2}
        alt="Shape Two"
        className="absolute -top-6 right-0"
        priority
      />

      {/* Shape three */}
      <Image
        src={shape3}
        alt="Shape Three"
        className="absolute -bottom-20 right-72"
        priority
      />
    </div>
  );
}
