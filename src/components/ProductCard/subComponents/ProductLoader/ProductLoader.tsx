import ContentLoader from 'react-content-loader';

export default function ProductLoader() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={230}
      viewBox="0 0 280 230"
      backgroundColor="#d6d6d6"
      foregroundColor="#ecebeb"
    >
      <rect x="177" y="368" rx="0" ry="0" width="1" height="0" />
      <rect x="108" y="323" rx="0" ry="0" width="2" height="3" />
      <rect x="0" y="352" rx="0" ry="0" width="460" height="19" />
      <rect x="0" y="379" rx="0" ry="0" width="460" height="16" />
      <rect x="-1" y="457" rx="0" ry="0" width="460" height="42" />
      <rect x="0" y="0" rx="0" ry="0" width="460" height="345" />
      <rect x="106" y="220" rx="0" ry="0" width="32" height="0" />
      <rect x="0" y="405" rx="0" ry="0" width="460" height="16" />
    </ContentLoader>
  );
}
