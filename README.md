# Live Version
The live version of the catalog can be found here:
https://commoncriteria.github.io/sfr-catalog/

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Tool Overview:** The SFR Catalogue is a front-end tool that allows for the search, retrieval and comparison of Threats, Objectives, and SFRs from a number of currently released Protection Profiles, Mods, Functional Packages that come from the NIAP document repository, and also the CC Part 2 (2022 version). The program features Threat and Objective search by name, SFR search by identifier or content, the ability to tell at-a-glance how many of each item are related to each other with changing number total on each filter card, the ability to easily see which SFRs have a TD associated with them, the ability to view those TDs, the ability to copy XML to the clipboard directly, switch between text and XML for many SFRs, and to compare items side-by-side.

**Feature Outline and Guide**:

•	**General Search Notes:** (Read this first!)
  o	You may search for any combination of Threat, Objective, or SFR. However, the search results are based on which Threats, Objectives, and SFRs have been related to each other in a document.
  o	The PP filter card will not appear until a selection of either Threat, Objective, or SFR has been made.
  o	Threats and Assumptions are in the same filter card, and so are Objectives and Environmental Objectives. These are not related to any SFRs.
  o	Multiple PPs can be selected by ctrl-clicking items in the dropdown.
  o	The CC Part 2 [2022] SFR information is only available in text format, and appears as an option when selecting an SFR family that appears in the CC Part 2 [2022].

•	**Threat/Objective Search:** Select a Threat or Objective from the dropdown or begin to type in the name of either. The Filter Card will autocomplete a list and you may select the item you wish to view. Then select one or more PPs from the PP filter card that appears.

•	**SFR Search:** Select either identifier or content search from the toggle on the upper left of the filter card and then select an option from the dropdown or begin to type in the text field on the filter card. Select an option from the dropdown. Then select one or more PPs from the PP filter card that appears.

•	**Filter Numbers:** The filter numbers on each filter card will change with each selection, showing how many items remain in the list of available items based on other selections. For example, if a user selects a Threat with no associated SFRs, the SFR filter card will display the number “0” and there will be no items in dropdown list.

•	**View TDs:** SFRs that have a released TD associated with them have an indicator to the right of their identifier in the content pane. To view a TD, click the “View TD” button.

•	**Copy to Clipboard:** To copy items to the clipboard,  select the “clipboard” icon.

•	**Switch between Text and XML:** This is controlled by the toggle on each content pane. If the associated item has a text representation, it will show up as text, otherwise, it will appear as an unformatted XML string.

**Considerations:** (As of Dec 2023)

•	This tool is a proof-of-concept, and there are currently no plans to develop it further:

•	This tool currently refers to a JSON document that has ingested the following documents:

PPs:

Application 1.4
MDF 3.3
GPCP 1.0
GPOS 4.3
Virtualization 1.1

Mods:

Bluetooth 1.0
MACSEC 1.0
SBC 1.0
Virtualization (Client) 2.4
Virtualization (Server 1.1
VPN CLient 2.4
VPN Gateway 1.3
WIDS 1.0
WLAN Access 1.0
WLAN Client 1.0

FPs:

SSH 1.0
TLS 1.0

**Please provide any feedback you have to the issues board associated with this repo.
Your feedback will help this tool or any that comes after it and is greatly appreciated!**

###### This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004, and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software Documentation Clause 252.227 - 7014(FEB 2014)

###### © 2023 The MITRE Corporation.
