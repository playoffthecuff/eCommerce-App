import { LogoIcon } from '../CustomIcons/CustomIcons';

export default function BreadCrumb() {
  return (
    <div>
      <LogoIcon /> / search / {category} / {item}
    </div>
  );
}
