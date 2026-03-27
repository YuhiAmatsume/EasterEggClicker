// ==UserScript==
// @name         LSS Easter Egg Clicker
// @namespace    www.leitstellenspiel.de
// @version      1.6
// @description  Automatically click the Easter Egg link when an Easter Egg is detected
// @author       Afilia
// @match        https://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    function compareVersions(v1, v2) {
        const versionParts1 = v1.split('-').map(Number);
        const versionParts2 = v2.split('-').map(Number);

        for (let i = 0; i < Math.max(versionParts1.length, versionParts2.length); i++){
            const part1 = versionParts1[i] || 0;
            const part2 = versionParts2[i] || 0;

            if (part1 < part2) {
                return -1;
            } else if (part1 > part2) {
                return 1;
            }
        }

        return 0;
    }

    async function fetchVersionData() {
        try {
            const response = await fetch ('https://afiliaassela.github.io/EasterEggClicker/version.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching version data:', error);
            return null;
        }
    }

    const versionData = await fetchVersionData();

    if (versionData && versionData.version && compareVersions(versionData.version, GM.info.script.version) > 0) {
        const confirmation = confirm(`Eine neue Version vom Autoclicker ist verfügbar! Version: (${versionData.version}). Möchtest du diese installieren?`)
        if (confirmation) {
            window.location.href = versionData.updateURL;
        }
    }
    // Prüfe, ob das Element mit der ID "easter-egg-link" vorhanden ist
    var easterEggLink = document.getElementById('easter-egg-link');

    if (easterEggLink) {
        var imageSrc = easterEggLink.querySelector('img').getAttribute('src');

        // Prüfe, ob der Bild-Quelltext das Wort "Pumpkin" enthält
        if (imageSrc.includes('pumpkin')) {
            // For Pumpkin, automatically click the Easter Egg link
            easterEggLink.click();
        } else if (imageSrc.includes('osterei')) {
            // For Osterei, automatically click the Easter Egg link
            easterEggLink.click();
        } else if (imageSrc.includes('santa_item')) {
            // For Christmas, automatically click the Easter Egg link
            easterEggLink.click();
        } else if (imageSrc.includes('football')) {
            // For Football, automatically click the Easter Egg Link
            easterEggLink.click();
        } else if (imageSrc.includes('summer_item')) {
            // For Flowers, automatically click the Easter Egg Link
            easterEggLink.click();
        } else if (imageSrc.includes('heart')) {
            // For Hearts, automatically click the Easter Egg Link
            easterEggLink.click();
        }
    }
})();
