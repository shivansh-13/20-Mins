interface PanecardProps {
    name: string
    address: string
    distance: number
    travelTime: number
}

export const Panecard: React.FC<PanecardProps> = ({ name, address, distance, travelTime }) => {
    function formatTime(seconds) {
        if (seconds < 60) {
            return `${seconds} sec`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes} min`;
        } else {
            const hours = Math.floor(seconds / 3600);
            return `${hours} hr`;
        }
    }
    const formattedTime = formatTime(travelTime);
    if (travelTime <= 0) {
        return null;
      }
    return (
        <div className='flex justify-between p-5 border-b-2'>
            <div className="flex flex-col w-48">
                <div className="font-semibold text-xl h-max-4 overflow-scroll">
                    {name}
                </div>
                <div className="text-xs text-gray-500 h-max-8 overflow-scroll">
                    {address}
                </div>
            </div>
            <div className="flex flex-col align-top">
                <div className='text-lg font-light my-auto text-green-600 ml-auto '>
                    {distance.toFixed(2)} km
                </div>
                <div className='text-2xl font-light my-auto text-green-600 ml-auto '>
                    {formattedTime}
                </div>
            </div>
        </div>

    )
}
