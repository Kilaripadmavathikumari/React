function SvgIcon({ children, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

export function CloseIcon() {
  return <SvgIcon><path d="m6 6 12 12M18 6 6 18" /></SvgIcon>;
}

export function EditIcon({ className }) {
  return (
    <SvgIcon className={className}>
      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
      <path d="m14 7 3 3" />
    </SvgIcon>
  );
}

export function DeleteIcon({ className }) {
  return (
    <SvgIcon className={className}>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="m6 7 1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </SvgIcon>
  );
}
