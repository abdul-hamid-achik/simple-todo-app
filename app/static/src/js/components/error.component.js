import {Delete, Notification} from "bloomer";
import React from "react";

const slugify = text => text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text


const Error = ({message}) => <Notification isColor="danger" id={slugify(message)}>
    <Delete
        onClick={() => document.getElementById(slugify(message)).remove()}/> {/* <----
         cant forward ref in library so i cant useRef:
          https://github.com/AlgusDark/bloomer/issues/92 */}
    {message}
</Notification>

export default Error