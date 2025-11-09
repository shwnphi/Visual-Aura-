export default function KeyWords({ keywords }) {
    if (!keywords || keywords.length === 0) {
        return <div>No KeyWords Yet!</div>;
    } 
    
    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div>
                {keywords.map((word, index) => 
                    <span 
                        key={word}
                        style={{
                            background: 'rgba(128, 128, 128, 1)',
                            color: 'black',
                            padding: '2px',
                            margin: '2px',
                            borderRadius: '8px',      
                            display: 'inline-block',
                            animation: 'fadeIn 0.5s ease-out',
                            animationDelay: `${index * 150}ms`,
                            animationFillMode: 'both'
                        }}
                    >
                        {word}
                    </span>
                )}
            </div>
        </>
    );
}