import { type XIcon as LucideIcon, type LucideProps } from "lucide-react";

type Icon = typeof LucideIcon;

const Icons = {
    spinner: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
    heart: (props: LucideProps) => (
        <svg
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 83.333 76.459"
            overflow="visible"
            enableBackground="new 0 0 83.333 76.459"
            {...props}
        >
            <path
                fill="#010101"
                d="M42.083,64.791l-0.416,0.418l-0.459-0.418C21.417,46.834,8.333,34.959,8.333,22.916
                c0-8.332,6.25-14.582,14.584-14.582c6.416,0,12.666,4.166,14.875,9.832h7.75C47.75,12.5,54,8.334,60.417,8.334
                C68.75,8.334,75,14.584,75,22.916C75,34.959,61.917,46.834,42.083,64.791 M60.417,0c-7.25,0-14.209,3.375-18.75,8.666
                C37.125,3.375,30.167,0,22.917,0C10.083,0,0,10.041,0,22.916C0,38.625,14.167,51.5,35.625,70.959l6.041,5.5l6.041-5.5
                C69.167,51.5,83.333,38.625,83.333,22.916C83.333,10.041,73.25,0,60.417,0z"
            />
        </svg>
    ),
    heartFull: (props: LucideProps) => (
        <svg
            baseProfile="basic"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path
                fill="rgb(232, 87, 87)"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.09 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 22 12.28 18.6 15.36 13.45 20.03L12 21.35z"
            />
        </svg>
    ),

    locked: (props: LucideProps) => (
        <svg
            version="1.1"
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="66.66"
            height="87.5"
            viewBox="0 0 66.66 87.5"
            overflow="visible"
            enableBackground="new 0 0 66.66 87.5"
            {...props}
        >
            <g id="XMLID_5_">
                <g>
                    <path
                        fill="#010101"
                        d="M8.33,79.16h50V37.5h-50V79.16z M58.33,87.5h-50C3.71,87.5,0,83.75,0,79.16V37.5
                        c0-4.63,3.71-8.34,8.33-8.34h4.17v-8.33C12.5,9.32,21.82,0,33.33,0s20.83,9.32,20.83,20.83v8.33h4.17c4.6,0,8.33,3.73,8.33,8.34
                        v41.66C66.66,83.771,62.93,87.5,58.33,87.5z M45.83,29.16v-8.33c0-6.9-5.6-12.5-12.5-12.5c-6.9,0-12.5,5.6-12.5,12.5v8.33H45.83z"
                    />
                    <path
                        fill="#FFFFFF"
                        d="M58.33,79.16h-50V37.5h50V79.16z M41.66,58.33c0-4.6-3.73-8.33-8.33-8.33C28.71,50,25,53.71,25,58.33
                        c0,4.58,3.71,8.33,8.33,8.33C37.93,66.66,41.66,62.93,41.66,58.33z"
                    />
                    <path
                        fill="#010101"
                        d="M33.33,50c4.6,0,8.33,3.73,8.33,8.33s-3.73,8.33-8.33,8.33c-4.62,0-8.33-3.75-8.33-8.33
                        C25,53.71,28.71,50,33.33,50z"
                    />
                </g>
                <g></g>
            </g>
        </svg>
    ),
    unlocked: (props: LucideProps) => (
        <svg
            version="1.1"
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="66.66"
            height="87.5"
            viewBox="0 0 66.66 87.5"
            overflow="visible"
            enableBackground="new 0 0 66.66 87.5"
            {...props}
        >
            <g id="XMLID_1_">
                <g>
                    <circle fill="#010101" cx="33.33" cy="58.33" r="8.33" />
                    <path
                        fill="#010101"
                        d="M8.33,79.16V37.5h50v41.66H8.33z M20.83,20.83c0-6.9,5.6-12.5,12.5-12.5c6.9,0,12.5,5.6,12.5,12.5h8.33
                        C54.16,9.32,44.84,0,33.33,0S12.5,9.32,12.5,20.83v8.33H8.33C3.73,29.16,0,32.89,0,37.5v41.66c0,4.61,3.73,8.34,8.33,8.34h50
                        c4.62,0,8.33-3.75,8.33-8.34V37.5c0-4.61-3.73-8.34-8.33-8.34h-37.5V20.83z"
                    />
                    <path
                        fill="#FFFFFF"
                        d="M8.33,79.16h50V37.5h-50V79.16z M25,58.33c0-4.6,3.73-8.33,8.33-8.33c4.6,0,8.33,3.73,8.33,8.33
                        s-3.73,8.33-8.33,8.33C28.73,66.66,25,62.93,25,58.33z"
                    />
                </g>
            </g>
        </svg>
    ),
    comment: (props: LucideProps) => (
        <svg
            version="1.1"
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="83.34"
            height="83.34"
            viewBox="0 0 83.34 83.34"
            overflow="visible"
            enableBackground="new 0 0 83.34 83.34"
            {...props}
        >
            <g id="XMLID_1_">
                <g>
                    <path
                        fill="#010101"
                        d="M75,58.34v-50H8.34v50h25v12.83l12.83-12.83H75z M83.34,8.34v50c0,4.6-3.729,8.33-8.34,8.33H49.59
                        L34.17,82.13c-0.83,0.79-1.88,1.21-2.92,1.21h-2.08c-2.3,0-4.17-1.87-4.17-4.17v-12.5H8.34c-4.61,0-8.34-3.73-8.34-8.33v-50
                        C0,3.71,3.75,0,8.34,0H75C79.61,0,83.34,3.73,83.34,8.34z"
                    />
                    <polygon
                        fill="#FFFFFF"
                        points="75,8.34 75,58.34 46.17,58.34 33.34,71.17 33.34,58.34 8.34,58.34 8.34,8.34 		"
                    />
                </g>
                <g></g>
            </g>
        </svg>
    ),
    trophy: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M18 2C17.1 2 16 3 16 4H8C8 3 6.9 2 6 2H2V11C2 12 3 13 4 13H6.2C6.6 15 7.9 16.7 11 17V19.08C8 19.54 8 22 8 22H16C16 22 16 19.54 13 19.08V17C16.1 16.7 17.4 15 17.8 13H20C21 13 22 12 22 11V2H18M6 11H4V4H6V11M20 11H18V4H20V11Z" />{" "}
        </svg>
    ),
};

const profileIcons = {
    genericPictureA: (props: LucideProps) => (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="67.238"
            height="67.219"
            viewBox="0 0 67.238 67.219"
            overflow="visible"
            enableBackground="new 0 0 67.238 67.219"
            {...props}
        >
            <g>
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M31.699,0.139c0.206-0.274,0.916-0.044,1.32-0.12
                    C32.813,0.293,32.103,0.063,31.699,0.139z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M34.219,0.019c0.404,0.076,1.115-0.154,1.32,0.12
                    C35.134,0.063,34.424,0.293,34.219,0.019z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M0.019,33.019c0.076-0.404-0.154-1.114,0.12-1.32
                    C0.063,32.103,0.293,32.813,0.019,33.019z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M67.099,31.699c0.274,0.206,0.044,0.916,0.12,1.32
                    C66.944,32.813,67.174,32.103,67.099,31.699z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M0.019,34.219c0.275,0.206,0.044,0.916,0.12,1.32
                    C-0.136,35.333,0.095,34.623,0.019,34.219z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#141414"
                    d="M67.219,34.219c-0.076,0.404,0.154,1.115-0.12,1.32
                    C67.174,35.134,66.944,34.424,67.219,34.219z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#AAAAAA"
                    d="M32.299,38.899c0.2,0,0.4,0,0.6,0
                    c-0.027,0.373-0.598,0.202-0.96,0.24C31.94,38.941,32.271,39.072,32.299,38.899z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#AAAAAA"
                    d="M34.939,38.899c0.002,0.198,0.333,0.067,0.359,0.24
                    c-0.346-0.015-0.785,0.065-0.959-0.12C34.318,38.758,34.764,38.964,34.939,38.899z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#303030"
                    d="M8.899,10.819c0.59-0.69,1.229-1.33,1.92-1.92
                    C10.229,9.589,9.589,10.229,8.899,10.819z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#303030"
                    d="M56.418,8.899c0.69,0.59,1.33,1.229,1.92,1.92
                    C57.649,10.229,57.008,9.589,56.418,8.899z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#4D4D4D"
                    d="M50.418,45.619c0.45,0.35,0.851,0.75,1.2,1.2
                    C51.168,46.469,50.768,46.069,50.418,45.619z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#4D4D4D"
                    d="M15.619,46.819c0.35-0.45,0.75-0.851,1.2-1.2
                    C16.469,46.069,16.069,46.469,15.619,46.819z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#4D4D4D"
                    d="M31.819,38.899c0.16,0,0.32,0,0.48,0
                    c-0.027,0.173-0.358,0.042-0.36,0.24c-0.24,0-0.48,0-0.72,0C31.165,38.804,31.873,39.233,31.819,38.899z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#4D4D4D"
                    d="M34.939,38.899c0.16,0,0.319,0,0.479,0
                    c-0.02,0.26,0.426,0.054,0.601,0.12c0,0.04,0,0.08,0,0.12c-0.24,0-0.48,0-0.721,0C35.272,38.966,34.941,39.097,34.939,38.899z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57.378,57.258c-1.096-4.304-3.158-7.641-5.76-10.439
                    c-0.35-0.45-0.75-0.851-1.2-1.2c-3.635-3.325-8.071-5.849-14.399-6.479c0-0.04,0-0.08,0-0.12c-0.175-0.066-0.62,0.14-0.601-0.12
                    c6.673-1.142,11.32-5.688,12-12.12c0.86-8.138-5.044-14.592-12.12-15.36c-8.298-0.9-14.704,4.97-15.479,12.12
                    c-0.552,5.082,1.485,8.916,3.96,11.4c2.037,2.045,4.589,3.515,8.04,3.96c0.054,0.334-0.654-0.095-0.6,0.24
                    c-6.33,0.63-10.764,3.156-14.4,6.479c-0.45,0.35-0.851,0.75-1.2,1.2c-2.602,2.798-4.664,6.137-5.76,10.439
                    c-5.183-5.297-9.035-11.925-9.72-21.72c-0.076-0.404,0.155-1.114-0.12-1.32c0-0.4,0-0.8,0-1.2c0.275-0.205,0.044-0.916,0.12-1.32
                    c0.575-9.305,4.237-15.522,8.76-20.88c0.69-0.59,1.33-1.23,1.92-1.92c5.357-4.523,11.575-8.186,20.88-8.76
                    c0.404-0.076,1.115,0.155,1.32-0.12c0.4,0,0.8,0,1.2,0c0.206,0.275,0.916,0.044,1.32,0.12c9.306,0.575,15.522,4.237,20.88,8.76
                    c0.59,0.69,1.23,1.33,1.92,1.92c4.522,5.357,8.186,11.575,8.761,20.88c0.075,0.404-0.155,1.115,0.12,1.32c0,0.4,0,0.8,0,1.2
                    c-0.275,0.206-0.045,0.916-0.12,1.32C66.414,45.333,62.561,51.961,57.378,57.258z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    fill="#FFFFFF"
                    d="M31.819,38.899c-3.451-0.445-6.003-1.915-8.04-3.96
                    c-2.475-2.485-4.512-6.318-3.96-11.4c0.776-7.15,7.182-13.021,15.479-12.12c7.076,0.769,12.98,7.223,12.12,15.36
                    c-0.68,6.432-5.327,10.979-12,12.12c-0.16,0-0.319,0-0.479,0c-0.175,0.065-0.621-0.141-0.6,0.12
                    c0.174,0.186,0.614,0.105,0.959,0.12c0.24,0,0.48,0,0.721,0c6.328,0.631,10.765,3.154,14.399,6.479c0.35,0.45,0.75,0.851,1.2,1.2
                    c2.602,2.799,4.664,6.136,5.76,10.439c-5.318,5.468-13.111,9.961-23.76,9.961c-10.648,0-18.441-4.492-23.76-9.961
                    c1.096-4.303,3.158-7.642,5.76-10.439c0.45-0.35,0.85-0.75,1.2-1.2c3.636-3.323,8.07-5.85,14.4-6.479c0.24,0,0.48,0,0.72,0
                    c0.362-0.038,0.933,0.133,0.96-0.24c-0.2,0-0.4,0-0.6,0C32.139,38.899,31.979,38.899,31.819,38.899z"
                />
            </g>
        </svg>
    ),

    genericPictureB: (props: LucideProps) => (
        <svg
            version="1.1"
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="83.34"
            height="83.34"
            viewBox="0 0 83.34 83.34"
            overflow="visible"
            enableBackground="new 0 0 83.34 83.34"
            {...props}
        >
            <g id="XMLID_7_">
                <g>
                    <path
                        fill="#010101"
                        d="M66.67,58.34C66.55,50,50,45.42,41.67,45.42s-24.88,4.58-25,12.92c5.38,8,14.58,13.33,25,13.33
                        S61.29,66.34,66.67,58.34z M41.67,0c22.92,0,41.67,18.63,41.67,41.67c0,23.01-18.66,41.67-41.67,41.67S0,64.68,0,41.67
                        S18.66,0,41.67,0z M54.17,25c0-6.9-5.6-12.5-12.5-12.5c-6.9,0-12.5,5.6-12.5,12.5c0,6.91,5.6,12.5,12.5,12.5
                        C48.57,37.5,54.17,31.91,54.17,25z"
                    />
                    <path
                        fill="#FFFFFF"
                        d="M41.67,45.42c8.33,0,24.88,4.58,25,12.92c-5.38,8-14.58,13.33-25,13.33s-19.62-5.33-25-13.33
                        C16.79,50,33.34,45.42,41.67,45.42z"
                    />
                    <path
                        fill="#FFFFFF"
                        d="M41.67,12.5c6.9,0,12.5,5.6,12.5,12.5c0,6.91-5.6,12.5-12.5,12.5c-6.9,0-12.5-5.59-12.5-12.5
                        C29.17,18.1,34.77,12.5,41.67,12.5z"
                    />
                </g>
                <g></g>
            </g>
        </svg>
    ),

    genericPictureC: (props: LucideProps) => (
        <svg
            version="1.1"
            baseProfile="basic"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            width="83.34"
            height="83.34"
            viewBox="0 0 83.34 83.34"
            overflow="visible"
            enableBackground="new 0 0 83.34 83.34"
            {...props}
        >
            <g>
                <g id="XMLID_4_">
                    <g>
                        <path
                            fill="#FFFFFF"
                            d="M29.17,33c0-6.9,5.6-12.5,12.5-12.5c6.9,0,12.5,5.6,12.5,12.5c0,6.52-4.98,11.86-11.33,12.45
                            c-0.41-0.021-0.8-0.03-1.17-0.03s-0.76,0.01-1.17,0.03C34.15,44.86,29.17,39.52,29.17,33z"
                        />
                        <path
                            fill="#010101"
                            d="M16.67,58.34c5.38,8,14.58,13.33,25,13.33s19.62-5.33,25-13.33c-0.11-7.97-15.22-12.5-23.83-12.89
                            c6.35-0.59,11.33-5.93,11.33-12.45c0-6.9-5.6-12.5-12.5-12.5c-6.9,0-12.5,5.6-12.5,12.5c0,6.52,4.98,11.86,11.33,12.45
                            C31.89,45.84,16.78,50.37,16.67,58.34z M83.34,41.67c0,23.01-18.66,41.67-41.67,41.67S0,64.68,0,41.67S18.66,0,41.67,0
                            C64.59,0,83.34,18.63,83.34,41.67z"
                        />
                        <path
                            fill="#FFFFFF"
                            d="M42.84,45.45c8.61,0.39,23.72,4.92,23.83,12.89c-5.38,8-14.58,13.33-25,13.33s-19.62-5.33-25-13.33
                            c0.11-7.97,15.22-12.5,23.83-12.89c0.39,0.029,0.78,0.05,1.17,0.05S42.45,45.479,42.84,45.45z"
                        />
                        <path
                            fill="#FFFFFF"
                            d="M41.67,45.42c0.37,0,0.76,0.01,1.17,0.03c-0.39,0.029-0.78,0.05-1.17,0.05s-0.78-0.021-1.17-0.05
                            C40.91,45.43,41.3,45.42,41.67,45.42z"
                        />
                    </g>
                    <g></g>
                </g>
            </g>
        </svg>
    ),
};

export { type Icon, Icons, profileIcons };
