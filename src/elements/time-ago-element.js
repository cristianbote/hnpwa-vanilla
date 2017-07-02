import { span } from '../core/dom-api';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_WEEK * 4;

const PLURAL = {
    seconds: [
        'second',
        'seconds',
    ],

    minutes: [
        'minute',
        'minutes',
    ],

    hours: [
        'hour',
        'hours',
    ],

    days: [
        'day',
        'days',
    ],

    weeks: [
        'week',
        'weeks',
    ],

    months: [
        'month',
        'months',
    ]
};

/**
 * Pluralize function
 * @param {object} config
 * @param {number|string} value
 * @returns {string}
 */
function pluralize(config, value) {
    return value < 2
        ? `${value} ${config[0]}`
        : `${value} ${config[1]}`;
}

export const timeAgo = (timestamp) => {
    "use strict";
    let seconds,
        minutes,
        hours,
        days,
        weeks,
        months,
        out = '';

    let diff = (Date.now() / 1e3) - timestamp;

    seconds = Math.round(diff);
    minutes = Math.round(diff / ONE_MINUTE);
    hours = Math.round(diff / ONE_HOUR);
    days = Math.round(diff / ONE_DAY);
    weeks = Math.round(diff / ONE_WEEK);
    months = Math.round(diff / ONE_MONTH);

    if (seconds && minutes < 1) {
        out = pluralize(PLURAL.seconds, seconds);
    }

    if (minutes > 0 && hours < 1) {
        out = pluralize(PLURAL.minutes, minutes);
    }

    if (hours > 0 && days < 1) {
        out = pluralize(PLURAL.hours, hours);
    }

    if (days > 0 && weeks < 1) {
        out = pluralize(PLURAL.days, days);
    }

    if (weeks > 0 && months < 1) {
        out = pluralize(PLURAL.weeks, weeks);
    }

    if (months > 0) {
        out = pluralize(PLURAL.months, months);
    }

    return out;
};

export const TimeAgoElement = (props) => {
    return span(
        props,
        `${timeAgo(props.timestamp)} ago`
    );
};