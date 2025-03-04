import React from 'react';

const PlayfulBackground = () => {
    // Enhanced animation styles with bigger movements
    const floatStyle1 = {
        animation: 'float1 6s ease-in-out infinite'
    };

    const floatStyle2 = {
        animation: 'float2 7s ease-in-out infinite 0.5s'
    };

    const floatStyle3 = {
        animation: 'float3 8s ease-in-out infinite 1s'
    };

    // Add keyframes with more pronounced movements
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float1 {
                0%, 100% { transform: translateY(0) rotate(12deg); }
                50% { transform: translateY(-15px) rotate(15deg); }
            }
            @keyframes float2 {
                0%, 100% { transform: translateY(0) rotate(-5deg); }
                50% { transform: translateY(-20px) rotate(8deg); }
            }
            @keyframes float3 {
                0%, 100% { transform: translateY(0) rotate(-12deg); }
                50% { transform: translateY(-18px) rotate(-8deg); }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Floating shapes with more visible animations but lower opacity */}
            <div style={floatStyle1} className="absolute top-10 left-10 w-12 h-12 rounded-lg bg-yellow-300 border-3 border-black transform rotate-12 opacity-50"></div>
            <div style={floatStyle2} className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-blue-200 border-3 border-black opacity-50"></div>
            <div style={floatStyle3} className="absolute bottom-[25%] left-[10%] w-10 h-10 rounded-lg bg-green-200 border-3 border-black transform -rotate-12 opacity-50"></div>
            <div style={floatStyle1} className="absolute bottom-[10%] right-[20%] w-14 h-14 rounded-full bg-purple-200 border-3 border-black opacity-50"></div>

            {/* Big decorative circles in corners with reduced opacity */}
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-yellow-100 border-4 border-black opacity-30"></div>
            <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-blue-100 border-4 border-black opacity-30"></div>

            {/* Dashed line patterns with reduced opacity */}
            <div className="absolute top-[40%] left-5 w-16 h-3 border-t-3 border-dashed border-black opacity-30"></div>
            <div className="absolute top-[60%] right-8 w-12 h-3 border-t-3 border-dashed border-black opacity-30"></div>

            {/* Small animated stars instead of static dots */}
            <div style={{ ...floatStyle1, animation: 'float1 4s ease-in-out infinite 0.2s' }} className="absolute top-[30%] right-[30%] flex items-center justify-center">
                <div className="w-8 h-8 text-lg">✨</div>
            </div>
            <div style={{ ...floatStyle2, animation: 'float2 5s ease-in-out infinite 1.5s' }} className="absolute bottom-[40%] left-[25%] flex items-center justify-center">
                <div className="w-6 h-6 text-base">✨</div>
            </div>
        </div>
    );
};

export default PlayfulBackground;