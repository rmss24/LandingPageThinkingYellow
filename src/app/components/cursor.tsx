import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor({ isHovered }: { isHovered: boolean }) {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const delayedMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const targetElement = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  // Size states based on hover
  const size = isHovered ? 100 : 30;

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
    const buttons = document.querySelectorAll("button:not(.non-magnetic)");
    let found = false;

    buttons.forEach((button) => {
      const buttonElement = button as HTMLElement;
      const rect = buttonElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < rect.width * 0.5) {
        if (!isStuck || targetElement.current !== buttonElement) {
          setIsStuck(true);
          targetElement.current = buttonElement;

          gsap.to(circle.current, {
            width: rect.width * 1.5,
            height: rect.height * 1.5,
            borderRadius: "10px",
            backgroundColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          });
        }

        const pull = Math.max(0, 1 - distance / (rect.width * 1.2));
        delayedMouse.current = {
          x: lerp(clientX, centerX, pull * 0.6),
          y: lerp(clientY, centerY, pull * 0.6),
        };

        gsap.to(buttonElement, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
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
        backgroundColor: "white",
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
        backgroundColor: isStuck ? "transparent" : "white",
        width: size,
        height: size,
        transition: "width 0.3s, height 0.3s, background-color 0.3s",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
      className="top-0 left-0 fixed cursor-none rounded-full z-30 pointer-events-none"
    >
      {isHovered && !isStuck && (
        <p className="text-black! font-semibold flex items-center absolute text-center gap-1 pointer-events-none z-50">
          vai al progetto <span>&#8599;</span>
        </p>
      )}
    </div>
  );
}
