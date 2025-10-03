
export default function Share({ title, url }){
  const u = typeof window !== 'undefined' ? window.location.href : url;
  const t = encodeURIComponent(title);
  const lu = encodeURIComponent(u);
  return (
    <div className="flex gap-3 text-sm">
      <a href={`https://twitter.com/intent/tweet?text=${t}&url=${lu}`} target="_blank" rel="noopener noreferrer" className="underline">Share on X</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${lu}`} target="_blank" rel="noopener noreferrer" className="underline">Share on Facebook</a>
      <a href={`mailto:?subject=${t}&body=${lu}`} className="underline">Email</a>
    </div>
  )
}
