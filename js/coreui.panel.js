
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.panel = {


    /**
     * Загрузка контента в тело панели
     * @param resource
     * @param tabId
     * @param url
     * @param event
     * @param callback
     * @returns {HTMLDivElement}
     */
    loadContent: function(resource, tabId, url, event, callback) {

        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        preloader.show();

        url = url.replace('#', '?');

        $('#core-panel-' + resource + ' > .core-panel-body > .core-panel-content').load(url, function () {

            $('#core-panel-' + resource + ' > .core-panel-body > .core-panel-tabs > li').removeClass('active');
            $('#core-panel-' + resource + ' > .core-panel-body > .core-panel-tabs > li#panel-' + resource + '-' + tabId).addClass('active');

            preloader.hide();

            if (typeof callback === 'function') {
                callback();
            }
        })
    },


    /**
     * Загрузка количества
     * @param {string} resource
     * @param {string} tabId
     * @param {string} url
     */
    loadCount: function (resource, tabId, url) {

        let panelTab = $('#core-panel-' + resource + ' > .core-panel-body > .core-panel-tabs > #panel-tab-' + tabId);

        if ( ! panelTab[0]) {
            return;
        }

        let link = panelTab.find('a');
        link.html(link.html() + ' <span class="tab-count"><i class="fa fa-spin fa-spinner"></i></span>')

        $.ajax({
            url: url,
            method: 'GET',
            dataType: "json",
            success: function (data) {

                if (data.hasOwnProperty('count') &&
                    ['string', 'number'].indexOf(typeof data.count) >= 0
                ) {
                    link.find('.tab-count').text('(' + data.count + ')');
                } else {
                    link.find('.tab-count').remove();
                }
            },
            error: function () {
                link.find('.tab-count').remove();
            }
        });
    }
}