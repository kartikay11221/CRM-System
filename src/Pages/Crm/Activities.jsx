import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../store/store";
import { Empty } from "../../Components/ui";

export default function Activities() {
  const list = useSelector((s) => s.activities);
  const dispatch = useDispatch();
  return (
    <div className="max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Activity Log</h2>
        {list.length > 0 && <button className="text-red-600 text-sm" onClick={() => window.confirm("Clear the log?") && dispatch(clear())}>Clear log</button>}
      </div>
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {list.map((a) => (
          <div key={a.id} className="p-3 flex justify-between text-sm">
            <span>{a.text}</span><span className="text-gray-400">{new Date(a.at).toLocaleString()}</span>
          </div>
        ))}
        {list.length === 0 && <Empty text="No activity yet. Actions you take will appear here automatically." />}
      </div>
    </div>
  );
}
