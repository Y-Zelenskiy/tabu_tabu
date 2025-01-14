let main_body = document.getElementById('body');
let main_area = document.getElementsByClassName('main')[0];
let futter_menu = document.getElementsByClassName('footer_container')[0];
const log = console.log;

function get_css_styles_border() {
    return `<div class='resize_border' id=${this.tab_id}_LU 
                    // style=' position: absolute;
                    //         top: 0;
                    //         left: 0;
                    //         display: block;
                    //         width: 20px;
                    //         height: 15px;
                    //         transform: translate(-10px, -10px);
                    //         background-color: rgba(255, 0, 0, 40%);
                    //         z-index: 12;
                    //         cursor: nw-resize;
                    //         opacity: ${opacity};
                    //     '></div>
                <div class='resize_border' id=${this.tab_id}_MU
                    // style=' position: absolute;
                    //         top: 0;
                    //         left: 0;
                    //         width: inherit;
                    //         height: 15px;
                    //         transform: translate( 10px, -10px);
                    //         background-color: rgba(255, 0, 0, 40%);
                    //         z-index: 11;
                    //         cursor: n-resize;
                    //         opacity: ${opacity};
                    //     '></div>
                <div class='resize_border' id=${this.tab_id}_RU
                    style=' position: absolute;
                            top: 0;
                            left: 100%;
                            width: 15px;
                            height: 15px;
                            transform: translate(-5px, -10px);
                            background-color: rgba(255, 0, 0, 40%);
                            z-index: 12;
                            cursor: ne-resize;
                            opacity: ${opacity};
                        '></div>
                <div class='resize_border' id=${this.tab_id}_RM
                    style=' position: absolute;
                            top: 10px;
                            left: 100%;
                            width: 15px;
                            height: inherit;
                            transform: translate(-5px, -10px);
                            background-color: rgba(255, 0, 0, 40%);
                            z-index: 11;
                            cursor: e-resize;
                            opacity: ${opacity};
                        '></div>
                <div class='resize_border' id=${this.tab_id}_RB
                    style=' position: absolute;
                            top: 100%;
                            left: 100%;
                            width: 15px;
                            height: 15px;
                            transform: translate(-5px, -5px);
                            background-color: rgba(255, 0, 0, 40%);
                            z-index: 12;
                            cursor: se-resize;
                            opacity: ${opacity};
                        '></div>
                <div class='resize_border' id=${this.tab_id}_MB
                    style=' position: absolute;
                            top: 100%;
                            left: 0;
                            width: inherit;
                            height: 15px;
                            transform: translate(-5px, -5px);
                            background-color: rgba(255, 0, 0, 40%);
                            z-index: 11;
                            cursor: s-resize;
                            opacity: ${opacity};
                        '></div>
                <div class='resize_border' id=${this.tab_id}_LB
                    // style=' position: absolute;
                    //         top: 100%;
                    //         left: 0;
                    //         width: 20px;
                    //         height: 15px;
                    //         transform: translate(-10px, -5px);
                    //         background-color: rgba(255, 0, 0, 40%);
                    //         z-index: 12;
                    //         cursor: sw-resize;
                    //         opacity: ${opacity};
                    //     '></div>
                <div class='resize_border' id=${this.tab_id}_LM
                //     style=' position: absolute;
                //             top: 10px;
                //             left: 0;
                //             width: 15px;
                //             height: inherit;
                //             transform: translate(-10px, -10px);
                //             background-color: rgba(255, 0, 0, 40%);
                //             z-index: 12;
                //             cursor: w-resize;
                //             opacity: ${opacity};
                //         '></div>
                </div>
                </div>`
}



let all_window_objects = [];

////////////////////////////////
//create a dumping variables
let user_ID = Math.floor(Math.random() * 10000);
let user_name = `User_${user_ID}`;
let user_items_count = Math.floor(Math.random() * 10) + 2;

////////////////////////////////


// create menu
class menuOBJ {
    constructor(id, name, items_count) {
        this.id = id;
        this.name = name;
        this.user_IMG = null;
        this.items_count = items_count;
        this.items = [];
        this.count = 0;
        this.active_obj = null;
        this.target = null;
        this.target_ID = null;
        this.target_DOM = null;
        this.old_active_target = null;
        this.old_active_target_ID = null;
        this.it_is_grabbed = false;
        this.it_is_moving = false;
        this.slide_menu = document.getElementsByClassName("slide_menu")[0];
        this.user_menu = document.getElementsByClassName("user_menu")[0];
        this.monitor_width = main_area.scrollWidth;
        this.monitor_height = main_area.scrollHeight;
    }
    // need to e.target.clasName
    selectWindow(className){
        this.target_ID = this.classToID(className);
        this.target = this.findObjectById(this.target_ID);
        
        if (this.old_active_target != null) {
            this.target.removeClass(this.old_active_target_ID);
        }

        if (this.target != null) {
            this.findDOMbyClass(className);
            this.old_active_target_ID = this.target_ID;
            this.old_active_target = this.target;

            this.target.activeClass(this.target_ID);
        }
    }

    findObjectById(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].main_ID == id) {
                return this.items[i];
            }
        }
        return null;
    }
    findDOMbyClass(id) {
        this.target_DOM = document.getElementsByClassName(id);
        return this.target_DOM;
    }

    // need e.target.className
    classToID(id) {
        return id.split(' ')[0];
    }
    setWindowParameters() {
        this.monitor_width = main_area.scrollWidth;
        this.monitor_height = main_area.scrollHeight;
    }

    writeUser() {
        let username = this.user_menu.getElementsByClassName('user_name')[0];
        username.textContent += this.name;
        if (this.user_IMG != null) {
            let user_img = this.user_menu.getElementsByClassName('user_menu_profile_picture')[0];
            user_img.src = this.user_IMG;
        }
    }

    beta_version() {
        log('beta version');
    }
}



let opacity = 0;

class window_tab {
    constructor() {
        this.it_is_open = false;
        this.main_ID = Math.floor(Math.random() * 10000);
        this.tab_id = `Tab_${this.main_ID}`;
        this.navbar_id = `Navbar${this.main_ID}`;
        this.tab_title = `Tab ${menu.count + 1}`;
        this.tab_content = `Content of Tab ${menu.count + 1}`;
        this.tab_html = 
        `<div id=${this.tab_id} class="${this.main_ID} window_tab">
            <div class="window_tab_border">
                <div id=${this.navbar_id} class="window_navbar">
                    <h2 class="window_navbar_title">${this.tab_title}</h2>
                    <div class="navbar_btn">
                        <span class="navbar_btn_write">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/><path d="m15 5 3 3"/></svg>
                        </span>
                        <span class="navbar_btn_hide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-picture-in-picture"><path d="M2 10h6V4"/><path d="m2 4 6 6"/><path d="M21 10V7a2 2 0 0 0-2-2h-7"/><path d="M3 14v2a2 2 0 0 0 2 2h3"/><rect x="12" y="14" width="10" height="7" rx="1"/></svg>
                        </span>
                        <span class="navbar_btn_full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-picture-in-picture-2"><path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"/><rect width="10" height="7" x="12" y="13" rx="2"/></svg>
                        </span>
                        <span class="navbar_btn_close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </span>
                    </div>
                </div>
                <textarea class ='window_content edit' readonly>${this.tab_content}</textarea>
                ${get_css_styles_border()}
            </div>
        </div>`
        this.tab_class = ['window_tab'];
        this.navbar_class = ['window_navbar'];
        this.style = {
            position: 'absolute',
            // top: `${count_tab * 20}px`,
            // left: '0px',
            width: `300px`,
            height: `200px`,
            backgroundColor: `rgb(117, 117, 117)`,
            opacity: 0.8,
            zIndex: 10
        };
        this.menuIcon_textIcon = 'T'
        this.menuIcon = `<div id='Menu_${this.main_ID}' class='${this.main_ID} menu_icon'>
                            <div id='Place_${this.main_ID}' class='placeholder'>
                            <h2 class="window_navbar_title">${this.tab_title}</h2>
                            <div class="window_content">${this.tab_content}</div>
                            </div>${this.menuIcon_textIcon}</div>`
        this.coords = {
            left: 0,
            top: 0
        }
    }
    ////////////////////////////////
    // New activeted tab
    activeClass(id) {
        let active_tab = document.getElementsByClassName(id);
        for (let i = 0; i < active_tab.length; i++) {
            active_tab[i].classList.add('active');
        }
    }
    removeClass(id) {
        let active_tab = document.getElementsByClassName(id);
        if (active_tab) {
            for (let i = 0; i < active_tab.length; i++) {
                active_tab[i].classList.remove('active');
            }
        }
    }
    activeClassGrabb() {
        menu.it_is_grabbed = true;
        menu.target_DOM[0].getElementsByClassName('window_navbar')[0].classList.add('grabbed');
    }
    removeClassGrabb() {
        try {
            menu.it_is_grabbed = false;
            menu.target_DOM[0].getElementsByClassName('window_navbar')[0].classList.remove('grabbed');
        } catch (e) {
            ////////////////////////////////////////////////////////////////
            // console.error('Error in removeClassGrabb function', e);
        }
    }
    ////////////////////////////////////////////////////////////////
    getPosition(element) {
        let parent_tab = element.target.closest('.active');
        
        let rect = parent_tab.getBoundingClientRect();
        this.coords = {
            left: element.clientX - rect.left,
            top: element.clientY - rect.top
        }
        return this.coords
    }
    moveAt(elem) {
        menu.it_is_moved = true;
        menu.target_DOM[0].style.left = elem.pageX - menu.target.coords.left+'px';
        menu.target_DOM[0].style.top = elem.pageY - menu.target.coords.top+'px';
        return this.moveAt;
    }
    ////////////////////////////////////////////////////////////////
    resizeBy() {

    }
    ////////////////////////////////////////////////////////////////
    writeHTML() {
        main_area.innerHTML += this.tab_html;
        this.writeToMenu();
        menu.count++;
    }
    writeCSS(css_obj) {
        let this_tab = document.getElementById(this.tab_id);
        if (css_obj) {
            for (let key in css_obj) {
                this_tab.style[key] = css_obj[key];
            }
        } else {
            for (let key in this.style) {
                this_tab.style[key] = this.style[key];
            }
        }
    }
    // writeCSSWindow() {
    //     let this_tab = document.getElementById(this.tab_id);
    //     this_tab.style = Object.assign({}, this_tab.style_window, this.style_window);
    //     for (let i = 0; i < this.tab_class.length; i++) {
    //         this_tab.classList.add(this.tab_class[i]);
    //     }
    // }


    ////////////////////////////////////////////////////////////////
    open() {
        this.it_is_open = true;
        this.writeHTML();
        this.writeCSS();
    }
    close() {
        this.it_is_open = false;
    }
    ////////////////////////////////////////////////////////////////

    writeToMenu() {
        futter_menu.innerHTML += this.menuIcon;
    }
    activeClassIcon() {

    }

}






main_body.addEventListener('mousedown', function(e) {
    if (e.target.closest('.menu_slide')) {
            menu.slide_menu.classList.toggle('hide');
        }
    if (e.target.closest('.menu_user')) {
        menu.user_menu.classList.toggle('hide');
    }
    if (e.target.closest('.menu_icon') || e.target.closest('.window_tab')) {
        if (e.target.closest('.window_tab')) {
            menu.selectWindow(e.target.closest('.window_tab').className);
        } else {
            menu.selectWindow(e.target.className);

        }
        
    }


    //navbar.addEventListener
    if (e.target.closest('.window_navbar') && !e.target.closest('.navbar_btn')) {
        menu.selectWindow(e.target.closest('.window_tab').className);
        menu.target.activeClassGrabb();
        menu.target.getPosition(e);

        document.addEventListener('mousemove', menu.target.moveAt(e));

        document.addEventListener('mouseup', function(e) {
            menu.target.removeClassGrabb();
            document.removeEventListener('mousemove', menu.target.moveAt);
        });
        
    }   

    // reseze window (needed resise to left and top)
    ////////////////////////////////////////////////////////////////
    //NED TO EDIT
    if (e.target.closest('.resize_border')) {
        menu.selectWindow(e.target.closest('.window_tab').className);
        let coords = menu.target_DOM[0].getBoundingClientRect();
        let param_tab = {
            width : coords.left - document.body.scrollLeft,
            height : coords.top - document.body.scrollTop
        }
        let tab_id = e.target.id;
        // log(e.target.id)
        // log(tab_id.search('M') !==-1);

        if (tab_id.search('M')!==-1) {
            if (tab_id.search('R') !==-1) {

                function resizeByX(element) {
                    let param = {
                        width : element.pageX - param_tab.width+'px',
                        height : element.pageY - param_tab.height+'px'
                    }
                    menu.target_DOM[0].style.width = param.width;
                    return resizeByX;
                }

                document.addEventListener('mousemove', resizeByX(e));

                document.addEventListener('mouseup', function(e) {
                    document.removeEventListener('mousemove', resizeByX);
                });
            } else {
                function resizeByY(element) {
                    let param = {
                        width : element.pageX - param_tab.width+'px',
                        height : element.pageY - param_tab.height+'px'
                    }
                    menu.target_DOM[0].style.height = param.height;
                    return resizeByY;
                }

                document.addEventListener('mousemove', resizeByY(e));

                document.addEventListener('mouseup', function(e) {
                    document.removeEventListener('mousemove', resizeByY);
                });
            }
        } else {
            function resizeBy(element) {
                let param = {
                    width : element.pageX - param_tab.width+'px',
                    height : element.pageY - param_tab.height+'px'
                }
                menu.target_DOM[0].style.width = param.width;
                menu.target_DOM[0].style.height = param.height;
                return resizeBy;
            }
            document.addEventListener('mousemove', resizeBy(e));
            document.addEventListener('mouseup', function(e) {
                document.removeEventListener('mousemove', resizeBy);
            });
        }

    }
});

main_body.addEventListener('click', function(e) {
////////////////////////////////////////////////////////////////
// to show animation beta version

    if (e.target.closest('.beta')) {
        let target_elem = e.target.closest('.beta');
        target_elem.classList.add('active');
        setTimeout(function() {
            target_elem.classList.remove('active');
        }, 1500);
    }
////////////////////////////////////////////////////////////////

    if (e.target.closest('.navbar_btn_write')) {
        let content = menu.target_DOM[0].getElementsByClassName('window_content')[0];
        content.toggleAttribute('readonly');
        content.classList.toggle('edit');
        content.addEventListener('onblur', function(e) {
            content.removeAttribute('readonly');
            content.classList.remove('edit');
        });
    }
    if (e.target.closest('.navbar_btn_hide')) {
        let target_elem = menu.findDOMbyClass(menu.target.main_ID);
        menu.target.removeClass(menu.target.main_ID)
        
        target_elem[0].classList.toggle('hide');
        target_elem[1].classList.toggle('hide');
    }
    if (e.target.closest('.navbar_btn_close')) {
        let target_elem = menu.findDOMbyClass(menu.target.main_ID);
        log(target_elem)
        // menu.target.removeClass(menu.target.main_ID)
        
        // target_elem[0].classList.toggle('hide');
        // target_elem[1].classList.toggle('hide');
    }

    if (e.target.closest('.menu_icon')) {
        let target_elem = menu.findDOMbyClass(menu.target.main_ID);

        if (target_elem[0].classList.contains('hide')) {
            menu.target.activeClass(menu.target.main_ID);

            target_elem[0].classList.remove('hide');
            target_elem[1].classList.remove('hide');
        } else {
            menu.target.removeClass(menu.target.main_ID);
            target_elem[0].classList.add('hide');
            target_elem[1].classList.add('hide');
        }
    }
    if (e.target.closest('.navbar_btn_full')) {
        log('full')
        menu.setWindowParameters();
        let target_elem = menu.findDOMbyClass(menu.target.main_ID);
        target_elem[0].style.width = menu.monitor_width + 'px';
        target_elem[0].style.height = menu.monitor_height + 'px';
        target_elem[0].style.left = '0';
        target_elem[0].style.top = '0';
    }
    if (e.target.classList.contains('navbar_btn_close')) {
        log('close')
    }
});

main_body.addEventListener('dblclick', function(e) {
    if (e.target.closest('.navbar_btn_write')) {
        log('dclic')
        let content = menu.target_DOM[0].getElementsByClassName('window_navbar_title')[0];
        content.toggleAttribute('contenteditable');
        content.classList.toggle('edit');
    }
});

main_body.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

////////////////////////////////////////////////////////////////
//onloading
// starte menu
let menu = null;

//document event listener before loading content
document.addEventListener('DOMContentLoaded', function(e) {
    log(e)
    
    menu = new menuOBJ(user_ID, user_name, user_items_count);
    menu.setWindowParameters();
    // Creating tabs and setting up active tab
    function createTab() {
        for (let i = 0; i < menu.items_count; i++) {
            let new_tab = new window_tab();
            
            // new_tab.writeHTML();
            // new_tab.writeCSS();
            new_tab.open();
            menu.items.push(new_tab);
        }
    }

    // start the loading
    createTab();
    menu.writeUser();
});