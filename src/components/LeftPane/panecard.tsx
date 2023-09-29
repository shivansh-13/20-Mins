interface PanecardProps {
    name: string
    address: string
    distance: number
}

export const Panecard: React.FC<PanecardProps> = ({ name, address, distance }) => {
    return (
    <div className='flex justify-between p-5 border-b-2'>
        <div>
            <div className="font-semibold text-xl h-max-4 overflow-scroll">
                {name}
            </div>
            <div className="text-xs text-gray-500 h-max-8 overflow-scroll">
                {address}
            </div>
        </div>
        <div className='text-3xl font-light my-auto text-green-600'>
            {distance}km
        </div>
    </div>
    )
}
