import React, { useEffect } from 'react';
import { useThreeContext } from '../../context/ThreeContext';
import axios from 'axios';

export default function SiteInfo() {

    const { siteInfo, setSiteInfo, siteScriptTrigger, setSiteScriptTrigger, siteRegisterTrigger, setSiteRegisterTrigger } = useThreeContext();

    useEffect(() => {
        console.log('%c  siteInfo', 'color: lightblue; font-size: 14px', siteInfo);
    }, [siteInfo]);


    useEffect(() => {
        async function getSiteInfo() {
            let siteInfo = await webflow.getSiteInfo();
            setSiteInfo(siteInfo);
            return siteInfo;
        }
        getSiteInfo();
    }, []);


    useEffect(() => {
        async function addScript() {
            try {
                if (siteInfo && siteInfo.siteId) {
                    // Define the headers
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    };
    
                    const response = await axios.put('https://de-three-js.vercel.app/api/addScript', {
                        siteId: siteInfo.siteId
                    }, { headers });
    
                    console.log(response.data, 'Script added to site');

                    // Add toast alert to confirm script added


                } else {
                    console.error('siteId not found in siteInfo');
                }
            } catch (error) {
                console.error('Error adding script to site:', error);
            }
        }
        if (siteScriptTrigger) {
            addScript();
            setSiteScriptTrigger(false);
        }
    }, [siteScriptTrigger]);
    

    useEffect(() => {

        async function registerScript() {

            console.log(siteInfo, 'siteInfo');

            try {
                if (siteInfo && siteInfo.siteId) {
                    const response = await axios.post('https://de-three-js.vercel.app/api/registerScript', {
                        siteId: siteInfo.siteId
                    });
                    
                    console.log(response.data, 'Script added to site');
                } else {
                    console.error('siteId not found in siteInfo');
                }
            } catch (error) {
                console.error('Error adding script to site:', error);
            }
        }
        if (siteRegisterTrigger) {
            registerScript();
        }

    }, [siteRegisterTrigger]);




    return <></>
}