"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";

/** Native modal semantics preserve Escape, focus containment, and focus return. */
export function InspectableImage(props: ImageProps) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();

  useEffect(() => {
    if (!open || !dialog.current) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const close = () => {
    dialog.current?.close();
    setOpen(false);
  };

  return (
    <>
      <button className="image-inspect" type="button" onClick={() => setOpen(true)} aria-label={`Enlarge: ${props.alt}`} aria-haspopup="dialog">
        <Image {...props} />
        <span className="image-inspect-label" aria-hidden="true">View image <ArrowUpRight size={14} /></span>
      </button>
      {open && createPortal(
        <dialog ref={dialog} className="image-dialog" aria-labelledby={heading} onCancel={close} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
          <div className="image-dialog-content">
            <header><p id={heading}>{props.alt}</p><button type="button" onClick={close} aria-label="Close image" autoFocus><X size={24} aria-hidden="true" /></button></header>
            <div className="image-dialog-scroll"><Image {...props} className="image-dialog-image" style={{ width: "100%", maxWidth: Number(props.width) < 400 ? 480 : Number(props.width) }} sizes="95vw" loading="eager" /></div>
          </div>
        </dialog>, document.body
      )}
    </>
  );
}
