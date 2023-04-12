import Icon from "./Icon";

export default function Box({ iconName, title = 'Title', total = 0, bgColor = 'bg-white' }) {
    return (
        <div className={`flex w-full md:w-52 items-center shadow-md justify-around ${bgColor} rounded-md p-4`}>
            <Icon name={iconName} />
            <div>
                <h1 className="text-4xl font-semibold">{total}</h1>
                <span className="font-semibold text-sm text-gray-400">{title}</span>
            </div>
        </div>
    );
}
