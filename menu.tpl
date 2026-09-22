
<table id="main" width="100%"><tbody><tr>
    <td id="menu-container" valign="top">
        <div id="menu-wrapper">
            <div id="home-button">
                <a href="index.php#module=admin&action=welcome" title="<!--SYSTEM_NAME-->" class="site-name"
                   onclick="if (event.button === 0 && ! event.ctrlKey) load('index.php#module=admin&action=welcome');">
                    <span><i class="fa fa-home"></i> <!--SYSTEM_NAME--></span>
                    <i class="fa fa-home"></i>
                </a>
            </div>
            <div id="menu-search-container">
                <input type="text" id="menu-search" placeholder="_tr(Поиск)" autocomplete="off" />
                <i class="fa fa-search"></i>
                <i class="fa fa-times-circle" id="menu-search-clear"></i>
            </div>
            <ul class="nav" id="menu-modules">
                <!-- BEGIN modules -->
                <li id="module-[MODULE_ID]" class="menu-module">
                    <a href="index.php#module=[MODULE_ID][MODULE_ACTION]"
                       onclick="if (event.button === 0 && ! event.ctrlKey) load('index.php#module=[MODULE_ID][MODULE_ACTION]');"
                    ><span class="module-title">[MODULE_NAME]</span></a>
                    <div class="module-submodules" style="display: none"></div>
                </li>
                <!-- END modules -->
            </ul>
        </div>

        <ul id="menu-submodules">
            <!-- BEGIN submodules -->
            <li id="submodule-[MODULE_ID]-[SUBMODULE_ID]" class="menu-submodule" style="display:none" >
                <a href="index.php#module=[MODULE_ID]&action=[SUBMODULE_ID]"
                   onclick="if (event.button === 0 && ! event.ctrlKey) load('index.php#module=[MODULE_ID]&action=[SUBMODULE_ID]');">[SUBMODULE_NAME]</a>
            </li>
            <!-- END submodules -->
        </ul>
    </td>
    <td id="main-content" valign="top">
        <div class="swipe-area"></div>
        <nav class="navbar navbar-default navbar-static-top" id="navbar-top">
            <div class="navbar-header">
                <a id="sidebar-toggle" href="javascript:void(0);"><i class="fa fa-bars"></i></a>
                <div class="module-title"></div>
                <div class="module-action"></div>
            </div>
            <ul id="user-section" class="nav navbar-top-links navbar-right">
                <!-- BEGIN navigate_item -->
                <li class="nav navbar-nav nav-[MODULE_NAME]">[HTML]</li>
                <!-- END navigate_item -->

                <li class="nav navbar-nav nav-profile dropdown">
                    <div class="dropdown-toggle" data-toggle="dropdown">
                        <div class="avatar-container">
                            <img src="[GRAVATAR_URL]" alt=""/>
                        </div>
                        <span class="nav-title hidden-xs hidden-sm">
                            <b><!--CURRENT_USER_FN--> <!--CURRENT_USER_LN--></b><br>
                            <!--CURRENT_USER_LOGIN-->
                        </span>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="dropdown-menu dropdown-menu-right dropdown-user">
                        <!-- BEGIN navigate_item_profile -->
                        <li class="dropdown-[MODULE_NAME]">[HTML]</li>
                        <!-- END navigate_item_profile -->

                        <li>
                            <a href="javascript:void(0);" onclick="logout()">
                                <i class="fa fa-power-off fa-fw"></i>
                                _tr(Выход)
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="mainContainer">
            <div id="preloader" style="display:none">
                <div class="lock-screen"></div>
                <div class="block">
                    <div class="spinner-icon">
                        <svg stroke="#3F56B1FF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" calcMode="spline" values="0 150;42 150;42 150;42 150" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" dur="1.5s" calcMode="spline" values="0;-16;-59;-59" keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" repeatCount="indefinite"/></circle><animateTransform attributeName="transform" type="rotate" dur="2s" values="0 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
                    </div>
                    <div class="spinner-text">_tr(Загрузка)...</div>
                </div>
            </div>
            <div id="main_body"></div>
        </div>
    </td>
</tr></tbody></table>
<!-- BEGIN theme_style -->
<style>
    #menu-wrapper { background-color: [BG_COLOR] }
    #main-content #sidebar-toggle { background-color: [BG_COLOR] }

    #menu-submodules,
    #menu-submodules .menu-submodule,
    #menu-submodules .menu-submodule-selected { background-color: [BG_COLOR] }

    #home-button > a { color: [TEXT_COLOR] }

    #main-content #sidebar-toggle { color: [TEXT_COLOR] }
    #menu-modules .menu-module a, #menu-modules .menu-module-selected a { color: [TEXT_COLOR] }

    #menu-search-container { display: [SHOW_SEARCH_MENU] }

    #menu-modules .menu-module:hover a,
    #menu-modules .menu-module a:hover,
    #menu-modules .menu-module a:focus,
    #menu-modules .menu-module.module-hover a,
    #menu-modules .menu-module-selected a {
        border-left-color: [BORDER_COLOR];
    }
    #main #home-button > a.home-select,
    #main #home-button > a:hover {
        border-left-color: [BORDER_COLOR];
    }
</style>
<!-- END theme_style -->