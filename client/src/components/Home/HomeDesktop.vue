<template>
    <div class="main_container">
        <div class="left_content">

        </div>
        <div class="center_content">
            <div class="language_cycler_container">
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="5" y1="12" x2="9" y2="16" />
                        <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                </div>
                <div class="lan_cycler_cont">
                    <p class="no_select">Javascript * Python * C/C++ * Ruby * All * Javascript * Python * C/C++ * Ruby * All</p>
                </div>
                <div class="lan_cycler_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <line x1="15" y1="16" x2="19" y2="12" />
                        <line x1="15" y1="8" x2="19" y2="12" />
                    </svg>
                </div>
            </div>
            <p class="discover_label no_select">Discover Projects</p>
            <div class="projects_area">

            </div>
            <div class="projects_footer">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_button" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>
        <div class="right_content">
            
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.left_content {
    width: 200px;
    height: 100vh;
    background-color: blue;
}
.center_content {
    flex-grow: 1;
}
.language_cycler_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
}
.lan_cycler_arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50px;
    height: 100%;
}
.lan_cycler_arrow > SVG {
    margin: 0 auto;
}
.lan_cycler_arrow > SVG:hover {
    stroke-width: 2.5;
}
.lan_cycler_cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
}
.lan_cycler_cont > p {
    font-size: 20px;
}
.projects_area {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200px;
}
.add_button {
    margin-top: 5px;
}
.add_button:hover {
    stroke-width: 0.7;
    cursor: pointer;
}
.projects_footer {
    width: 100%;
}
.right_content {
    width: 350px;
    height: 100vh;
    background-color: blue;
}
.discover_label {
    font-size: 25px;
    margin-top: 50px;
    margin-bottom: 40px;
}
</style>