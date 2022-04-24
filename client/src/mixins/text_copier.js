const textCopier = {
    methods: {
        copyToClipboard(text) {
            const elem = document.createElement('textarea');
            elem.value = text;
            document.body.appendChild(elem);
            elem.select();
            document.execCommand('copy');
            document.body.removeChild(elem);
        },
        copyToClipboardWithNotification(text) {
            this.copyToClipboard(text);
            this.$store.dispatch("alertUser", { type: "success", title: "Copied link to clipboard" });
        }
    }
};

export default textCopier;