
export default function Transcipt({ transcript }) {
    return (
        <div style={{
            background: 'rgba(200, 200, 200, 0.5)',
            maxHeight: '200px',
            overflowY: 'auto',
        }}>
            {transcript ? transcript : "Press Button to Start"} </div>
    )

};