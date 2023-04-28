const TextInput = (props: {
  placeholder?: string;
  labelTopL?: string;
  labelTopR?: string;
  labelBotL?: string;
  labelBotR?: string;
}): React.ReactElement => {
  return (
    <div className="w-full max-w-xs form-control">
      <label className="label">
        <span className="text-base font-bold label-text">
          {props.labelTopL}
        </span>
        <span className="label-text-alt">{props.labelTopR}</span>
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-full h-10 max-w-xs input input-bordered"
      />
      <label className="label">
        <span className="label-text-alt">{props.labelBotL}</span>
        <span className="label-text-alt">{props.labelBotR}</span>
      </label>
    </div>
  );
};

export default TextInput;
