import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

// Custom cursor component with image support
export default function CustomCursor({
  hoveredImage,
  isHovered,
}: {
  hoveredImage: string | null;
  isHovered: boolean;
}) {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const delayedMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const targetElement = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Size states based on hover
  const size = isHovered ? 120 : 30;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const manageMouseMove = (e: MouseEvent): void => {
    if (isMobile) return;

    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY,
    };

    // Check for magnetic effect
    const accordionHeaders = document.querySelectorAll(
      ".accordion-header:not(.non-magnetic)"
    );
    let found = false;

    accordionHeaders.forEach((header) => {
      const headerElement = header as HTMLElement;
      const rect = headerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < rect.width * 0.5) {
        if (!isStuck || targetElement.current !== headerElement) {
          setIsStuck(true);
          targetElement.current = headerElement;

          gsap.to(circle.current, {
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        }

        const pull = Math.max(0, 1 - distance / (rect.width * 1.2));
        delayedMouse.current = {
          x: lerp(clientX, centerX, pull * 0.3),
          y: lerp(clientY, centerY, pull * 0.3),
        };

        gsap.to(headerElement, {
          x: distanceX * 0.05,
          y: distanceY * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });

        found = true;
        return;
      }
    });

    if (!found && isStuck) {
      setIsStuck(false);

      if (targetElement.current) {
        gsap.to(targetElement.current, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)",
        });
        targetElement.current = null;
      }

      gsap.to(circle.current, {
        width: size,
        height: size,
        borderRadius: "100%",
        backgroundColor: hoveredImage ? "transparent" : "white",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const moveCircle = (x: number, y: number): void => {
    if (circle.current) {
      gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  const animate = () => {
    if (isMobile) return;

    if (!isStuck) {
      delayedMouse.current = {
        x: lerp(delayedMouse.current.x, mouse.current.x, 0.15),
        y: lerp(delayedMouse.current.y, mouse.current.y, 0.15),
      };
    }

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    rafId.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", manageMouseMove);
    rafId.current = requestAnimationFrame(animate);

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    delayedMouse.current = { x: initialX, y: initialY };
    mouse.current = { x: initialX, y: initialY };

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isStuck, isMobile]);

  // Update size when isHovered prop changes
  useEffect(() => {
    if (isMobile || !circle.current) return;

    if (!isStuck) {
      gsap.to(circle.current, {
        width: size,
        height: size,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered, size, isStuck, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={circle}
      style={{
        backgroundColor: isStuck || hoveredImage ? "transparent" : "white",
        width: size,
        height: size,
        transition: "width 0.3s, height 0.3s, background-color 0.3s",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        zIndex: 99999,
      }}
      className="top-0 left-0 fixed cursor-none rounded-2xl pointer-events-none overflow-hidden"
    >
      {hoveredImage && (
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src={hoveredImage}
            alt="Cursor image"
            className="w-full h-full object-cover rounded-2xl -z-50!"
          />
        </div>
      )}
      {isHovered && !isStuck && !hoveredImage && (
        <p className="text-black font-semibold flex items-center absolute text-center gap-1 pointer-events-none z-50">
          scopri di più <span>&#8595;</span>
        </p>
      )}
    </div>
  );
}
