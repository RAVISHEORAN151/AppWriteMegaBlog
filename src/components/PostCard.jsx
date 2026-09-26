import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({
  $id,
  title,
  featureImage,
  $createdAt
}) {
 return (
  <Link to={`/post/${$id}`}>
    <div className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 transition duration-300 hover:border-violet-400/30 hover:shadow-[0_0_18px_rgba(139,92,246,0.25)]">
      {featureImage && (
        <div className="mb-4 w-full justify-center overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFileView(featureImage).toString()}
            alt={title}
            className="w-full rounded-xl"
          />
        </div>
      )}

      <h2 className="text-xl font-bold text-slate-100">{title}</h2>
      <p className="text-sm text-slate-400">
      {new Date($createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </p>
    </div>
  </Link>
);
}

export default PostCard;