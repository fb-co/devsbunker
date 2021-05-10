const ScreenType = {
    defaultThresh: 950,
    isMobile: function(thresh) {
        const threshToCompare = thresh || this.defaultThresh;

        const screenWidth = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        );

        return (screenWidth <= threshToCompare);
    }
}

export default ScreenType