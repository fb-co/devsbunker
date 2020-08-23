const ScreenType = {
    isMobile: function(thresh) {
        const screenWidth = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        );
        
        return (screenWidth <= thresh);
    }
}

export default ScreenType