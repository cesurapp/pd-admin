Selectize.define('no_results', function (options) {
    let self = this;

    options = $.extend({
        message: 'No results found.',

        html: function (data) {
            return (
                '<div class="selectize-dropdown ' + data.classNames + '">' +
                '<div class="selectize-dropdown-content">' +
                '<div class="no-results">' + data.message + '</div>' +
                '</div>' +
                '</div>'
            );
        }
    }, options);

    self.displayEmptyResultsMessage = function () {
        this.$empty_results_container.css('top', this.$control.outerHeight());
        this.$empty_results_container.css('width', this.$control.outerWidth());
        this.$empty_results_container.show();
        this.$control.addClass("dropdown-active");
    };

    self.refreshOptions = (function () {
        let original = self.refreshOptions;

        return function () {
            original.apply(self, arguments);
            if (this.hasOptions || !this.lastQuery) {
                this.$empty_results_container.hide()
            } else {
                this.displayEmptyResultsMessage();
            }
        }
    })();

    self.onKeyDown = (function () {
        let original = self.onKeyDown;

        return function (e) {
            original.apply(self, arguments);
            if (e.keyCode === 27) {
                this.$empty_results_container.hide();
            }
        }
    })();

    self.onBlur = (function () {
        let original = self.onBlur;

        return function () {
            original.apply(self, arguments);
            this.$empty_results_container.hide();
            this.$control.removeClass("dropdown-active");
        };
    })();

    self.setup = (function () {
        let original = self.setup;
        return function () {
            original.apply(self, arguments);
            self.$empty_results_container = $(options.html($.extend({
                classNames: self.$input.attr('class')
            }, options)));
            self.$empty_results_container.insertBefore(self.$dropdown);
            self.$empty_results_container.hide();
        };
    })();
});

window.selectReload = function (container) {
    /**
     * Remote Select for Ajax Search
     */
    let remote = container ? $(container).find('[data-remote]') : $('[data-remote]');
    let url = '';
    if (remote.length > 0) {
        let tags = remote.data('tags');
        let config = {
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            allowEmptyOption: true,
            create: false,
            maxOptions: 100,
            loadThrottle: 500,
            placeholder: 'Search...',
            onInitialize: function () {
                url = this.$input.data('remote');
            },
            load: function (query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: url,
                    dataType: 'json',
                    data: {
                        filter: query
                    },
                    error: function () {
                        callback();
                    },
                    success: function (res) {
                        callback(res);
                    }
                });
            }
        };

        if (tags) {
            config = {
                ...config, ...{
                    plugins: ['remove_button'],
                    delimiter: ',',
                    persist: false,
                    loadThrottle: 500,
                    allowEmptyOption: false,
                    create: true,
                    valueField: 'name'
                }
            }
        }

        $(remote).selectize(config);
    }

    /**
     * Tags
     */
    let tags = container ? $(container).find('[data-tags]:not([data-remote])') : $('[data-tags]:not([data-remote])');
    $.each(tags, function (index, item) {
        $(item).selectize({
            plugins: ['remove_button'],
            delimiter: ',',
            persist: false,
            create: function (input) {
                return {
                    value: input,
                    text: input
                }
            }
        });
    });

    /**
     * Custom Select
     */
    let select = container ? $(container).find('select:not([data-remote], [data-geo])') : $('select:not([data-remote], [data-geo])');
    $.each(select, function (index, item) {
        let data = {};
        $.each(item.dataset, function (key, val) {
            data[key] = val;
        });

        // Add Remove Button for Multiple
        if (item.getAttribute('multiple')) {
            data['plugins'] = ['remove_button', 'no_results'];
            data['delimiter'] = ',';
            data['persist'] = false;
            data['dropdownDirection'] = 'top';
        } else {
            // Search No Result Plugin
            data['plugins'] = ['no_results'];

            data['onDropdownOpen'] = function () {
                if (this.settings.allowEmptyOption) {
                    this.oldVal = this.getValue();
                } else {
                    this.oldVal = this.getValue() === '' ? this.oldVal : this.getValue();
                }

                this.clear(true);
            };
            data['onBlur'] = function () {
                if (this.items.length === 0) {
                    this.setValue(this.oldVal);
                }
            };

            if (select.find('option[value=""]')) {
                data['allowEmptyOption'] = true
            }
        }

        $(item).selectize(data);
    });
};

$(function () {
    selectReload();
});
