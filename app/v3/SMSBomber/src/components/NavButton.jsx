import "./NavButton.css";

export default function NavButton({ icon, ...props }) {
  return (
    <div className="navButton">
      <div className="navButtonIcon">
        <img src={icon} alt={props.children} />
      </div>
      <div className="navButtonText">{props.children}</div>
    </div>
  );
}
