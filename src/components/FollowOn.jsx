import {FaInstagram, FaXTwitter, FaGithub} from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://github.com/Techie-Gautam">
          <FaGithub size={20} />
        </a>
        <a href="">
          <FaInstagram size={20} />
        </a>
        <a href="https://x.com/TechieGautam48">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;