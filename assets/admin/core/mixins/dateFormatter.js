import {parse, parseISO, format, formatDistance} from 'date-fns'
import {tr, enUS as en} from 'date-fns/locale';

const locales = {tr, en};

export default {
    methods: {
        dateISO(date, dateFormat) {
            return date ? format(parseISO(date), dateFormat || 'dd.MM.yyyy') : '';
        },
        dateISOTime(date) {
            return this.dateISO(date, 'dd.MM.yyyy HH:mm');
        },
        dateRelative(date, message) {
            if (!date) return '';

            let isoDate = parseISO(date);
            if (isoDate < new Date()) {
                return message || '-';
            }

            return formatDistance(isoDate, new Date(), {
                addSuffix: true,
                includeSeconds: false,
                locale: locales[document.documentElement.lang]
            });
        }
    }
}
