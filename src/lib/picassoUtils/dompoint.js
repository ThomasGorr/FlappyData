const DEFAULT_SETTINGS = ({
    width: 50,
    height: 50,
});

export const dompoint = {
    require: ["resolver"],
    renderer: "dom",
    beforeRender(options) {
        this.size = options.size;
    },
    generatePoints(data) {
        return data.items.map((row) => {
            const width = 50;
            const height = 50;
            const imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURUdwTFCbVGGlZG2/cVafWVWfWFuhXkiZTC+CM0KWRWS7Z3TCeFq3XlCzVHvFfkKcRmaraVWiWduLXHAAAAAKdFJOUwBY4/8vupUR/twb7r7/AAACf0lEQVRYw+2Y2barIAyGNwqooBLe/2V3wuzQkg7r3Jz9gwwxfARspas/P396S9M0vXmzlRR6mdVDZ6nnRQvZg01CDwB+vneewiQzAAxKyGfBEAWs3d2MWpTSokprtSxk97u1I7K0fIZBCsoGUlLbpu4eZB+hpoDZk8YwJCrX1ERj8dnvUJNAzLhXja6SHnBiVOKwk0IhpnVJpPmEwf05ClGqomhzThiSL3uUd8nBxQnXB3l98rSqOp0/bjPYWy9cXyTpu3DS+sCnaJyHR07opQNIkYsN6TBT7NtxHE2c6eqTbKBSRPl+Htu07IGabx6xFYQTWtIe61o0lthvm6WVlxZBe7qxH1K2HE0nb0gggaA3tJcGgIiPn75hnwhA5s/Rh6Dhy6BJ4SZ9kEZI79MCOmV2yiB6/ij6CLel5WaTnj6BTBralmwUFJCAENK7yh8jBPnPQD6D8PmTweA7Cl4JBHBLqDHkF/ekPBq998PAjw3Im8aBr6epVAMKj0QxeEOvH0byA7prGqdke4TKeK5qT15hoaU0t9nr8DsgDzyfSiqAjGnLHMOx4fXTox9BN8u4MUEfFCMxpbx0owMjotPSaq/pciJi6nsgNf0j0MrjrBwQsboXK6LVRNzjmhtRKkp17fdAi18NKzFA5NXmOM6kulgYoCvqQIiWlyLKEHMgrOyl8eSXD0HmW6D1y6CtD9owXXOtY+pG5OJ8J8i2Vli4ehFJimg7BXUKKyXXAbnE2UgBWus15XDbd0FxSHJPAxtAnsIvshdRiaJctVHILFAzeruiks2xQAz9tyDh+CAn+hG55jp2NlcjEk9PEcfW0zck/ghcmFKy+48PU3//jr2sX/mIg015jZCyAAAAAElFTkSuQmCC";//pointMap.get(index);

            const style = {
                position: "absolute",
                left: `${(this.size.width * row.x) - (data.settings.width / 2)}px`,
                top: `${(this.size.height * row.y) - (data.settings.height / 2)}px`,
                width: `${width}px`,
                height: `${height}px`,
                "background-image": "url(" + imageSrc + ")",
            };

                // filter out any reserved keys but allow for other style keys
                // mutates style
            const ILLEGAL_KEY_NAMES = ["x", "y", "width", "height", "left", "top", "position"];
            Object.keys(data.settings)
                .filter(key => ILLEGAL_KEY_NAMES.indexOf(key) === -1)
                .forEach(key => style[key] = data.settings[key]);

            return this.h("div", {style});
        }
        );
    },
    render(h, {data}) {
        this.h = h; //snabbdom reference

        const resolved = this.resolver.resolve({
            data,
            settings: this.settings.settings,
            defaults: Object.assign({}, DEFAULT_SETTINGS),
            scaled: {
                x: this.size.width,
                y: this.size.height,
            },
        });

        return this.generatePoints(resolved);
    },
};