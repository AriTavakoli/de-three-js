/*

_      __    __   _____             
| | /| / /__ / /  / _/ /__ _    __   
| |/ |/ / -_) _ \\/ _/ / _ \\ |/|/ / 
|__/|__/\\__/_.__/_//_/\\___/__,__/  
_____________________________________

 1.) upload
 2.) dots
 3.) download
 4.) merge
 5.) code
 6.) link
 7.) performance
 8.) light

*/
export type IconName = keyof typeof IconCollection;

export const IconCollection = {
    upload: Upload,
    dots: ThreeDots,
    download: Download,
    merge: Merge,
    code: Code,
    link: Link,
    performance: Performance,
    light: Light,
}


function ThreeDots() {
    return (
        <svg width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg" role="img"
            aria-labelledby="dotsTitle">
            <title id="dotsTitle">More options icon</title>
            <g id="More">
                <g id="icon">
                    <path
                        d="M3.38462 9.88459C4.14932 9.88459 4.76923 9.26468 4.76923 8.49997C4.76923 7.73527 4.14932 7.11536 3.38462 7.11536C2.61991 7.11536 2 7.73527 2 8.49997C2 9.26468 2.61991 9.88459 3.38462 9.88459Z"
                        fill="#D9D9D9" />
                    <path
                        d="M8 9.88459C8.7647 9.88459 9.38462 9.26468 9.38462 8.49997C9.38462 7.73527 8.7647 7.11536 8 7.11536C7.2353 7.11536 6.61538 7.73527 6.61538 8.49997C6.61538 9.26468 7.2353 9.88459 8 9.88459Z"
                        fill="#D9D9D9" />
                    <path
                        d="M14 8.49997C14 9.26468 13.3801 9.88459 12.6154 9.88459C11.8507 9.88459 11.2308 9.26468 11.2308 8.49997C11.2308 7.73527 11.8507 7.11536 12.6154 7.11536C13.3801 7.11536 14 7.73527 14 8.49997Z"
                        fill="#D9D9D9" />
                </g>
            </g>
        </svg>
    )
}



function Upload() {
    return (
        <svg id="upload" viewBox="0 0 16 17" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
            aria-labelledby="uploadTitle">
            <title id="uploadTitle">Upload icon</title>
            <path
                d="M12.3187 7.3125C12.1788 5.185 10.302 3.5 8 3.5C5.69802 3.5 3.82125 5.18562 3.68129 7.3125C2.86996 7.46381 2.14769 7.89281 1.65507 8.51601C1.16245 9.1392 0.934721 9.91199 1.01621 10.684C1.0977 11.4559 1.48257 12.1719 2.09592 12.6924C2.70927 13.2129 3.50721 13.5008 4.33443 13.5H11.6656C12.4928 13.5008 13.2907 13.2129 13.9041 12.6924C14.5174 12.1719 14.9023 11.4559 14.9838 10.684C15.0653 9.91199 14.8376 9.1392 14.3449 8.51601C13.8523 7.89281 13.13 7.46381 12.3187 7.3125ZM8.9997 9.75V11.625H7.0003V9.75H4.33443L8 6L11.6656 9.75H8.9997Z"
                fill="#D9D9D9" />
        </svg>

    )
}

function Download() {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" color = "lightgrey" viewBox="0 0 256 256" role="img" width ="16" height = "16" aria-labelledby="downloadTitle">
                <title id="downloadTitle">Download icon</title>
                <rect width="256" height="256" fill="none" />
                <line x1="128" y1="152" x2="128" y2="40" fill="none" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="16" />
                <path d="M216,152v56a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V152" fill="none" stroke="currentColor"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                <polyline points="168 112 128 152 88 112" fill="none" stroke="currentColor" stroke-linecap="round"
                    stroke-linejoin="round" stroke-width="16" />
            </svg>

    )
}


function Merge() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" role="img"
            aria-labelledby="mergeTitle">
            <title id="mergeTitle">Merge icon</title>
            <g transform="rotate(90 8 8.5)">
                <path
                    d="M8.00006 1.5L4.50006 5.5H7.00001V8.67157C7.00001 8.93679 6.89466 9.19114 6.70712 9.37868L2.29291 13.7929L3.70712 15.2071L8.12133 10.7929C8.68394 10.2303 9.00001 9.46722 9.00001 8.67157V5.5L11.5001 5.5L8.00006 1.5Z"
                    fill="#D9D9D9" />
                <path
                    d="M9.53555 12.2071C9.98237 11.7603 10.3359 11.2376 10.5836 10.6693L13.7072 13.7929L12.2929 15.2071L9.41425 12.3284L9.53555 12.2071Z"
                    fill="#D9D9D9" />
            </g>
        </svg>
    )
}

function Code() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" role="img"
            aria-labelledby="codeTitle">
            <title id="codeTitle">Code icon</title>
            <g clip-path="url(#clip0_132_5712)">
                <path
                    d="M10.8123 5.68728L13.6248 8.49976L10.8125 11.3125L12.2427 12.7426L16.4851 8.49977L12.2424 4.25713L10.8123 5.68728Z"
                    fill="#D9D9D9" />
                <path
                    d="M5.18775 11.3127L2.37527 8.5002L5.18754 5.6875L3.75738 4.25734L-0.485046 8.50019L3.7576 12.7428L5.18775 11.3127Z"
                    fill="#D9D9D9" />
                <path d="M8.00002 2.5H10L8.00002 14.5H6.00002L8.00002 2.5Z" fill="#D9D9D9" />
            </g>
            <defs>
                <clipPath id="clip0_132_5712">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                </clipPath>
            </defs>
        </svg>
    )
}


function Link() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="68" viewBox="0 0 64 68" fill="none" role="img"
            aria-labelledby="linkTitle">
            <title id="linkTitle">Link icon</title>
            <path
                d="M2.17157 11.3284C1.42143 10.5783 1 9.56087 1 8.5C1 7.43913 1.42143 6.42172 2.17157 5.67157C2.92172 4.92143 3.93913 4.5 5 4.5H7V6.5H5C4.46957 6.5 3.96086 6.71071 3.58579 7.08579C3.21071 7.46086 3 7.96957 3 8.5C3 9.03043 3.21071 9.53914 3.58579 9.91421C3.96086 10.2893 4.46957 10.5 5 10.5H7V12.5H5C3.93913 12.5 2.92172 12.0786 2.17157 11.3284Z"
                fill="#D9D9D9" />
            <path
                d="M13.8284 11.3284C14.5786 10.5783 15 9.56087 15 8.5C15 7.43913 14.5786 6.42172 13.8284 5.67157C13.0783 4.92143 12.0609 4.5 11 4.5H9V6.5H11C11.5304 6.5 12.0391 6.71071 12.4142 7.08579C12.7893 7.46086 13 7.96957 13 8.5C13 9.03043 12.7893 9.53914 12.4142 9.91421C12.0391 10.2893 11.5304 10.5 11 10.5H9V12.5H11C12.0609 12.5 13.0783 12.0786 13.8284 11.3284Z"
                fill="#D9D9D9" />
            <path d="M6 7.5H10V9.5H6V7.5Z" fill="#D9D9D9" />
        </svg>
    )
}


function Performance() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" role="img"
            aria-labelledby="performanceTitle">
            <title id="performanceTitle">Performance icon</title>
            <path
                d="M15 10.2023C15 8.42475 14.2628 6.71999 12.9507 5.46306C11.6385 4.20613 9.8588 3.5 8.00311 3.5C6.14742 3.5 4.36773 4.20613 3.05556 5.46306C1.74339 6.71999 1.00622 8.42475 1.00622 10.2023H1V12.5H5.04444L10.9011 5.95414L8.60667 12.5H15V10.2023Z"
                fill="#D9D9D9" />
        </svg>
    )
}



function Light() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height = "16" color = "lightgrey" fill="none">
            <rect width="256" height="256" fill="none" />
            <line x1="128" y1="40" x2="128" y2="16" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <circle cx="128" cy="128" r="56" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="64" y1="64" x2="48" y2="48" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="64" y1="192" x2="48" y2="208" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="192" y1="64" x2="208" y2="48" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="192" y1="192" x2="208" y2="208" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="40" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="128" y1="216" x2="128" y2="240" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
            <line x1="216" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="16" />
        </svg>
    )
}






