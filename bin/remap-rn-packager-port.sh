#!/usr/bin/env bash

if [[ ! -z ${SKIP_RN_PORT_REMAP} ]]; then
  echo "Skipping the remapping of ports because environment variable SKIP_RN_PORT_REMAP is defined."
  exit 0
fi
echo "Changing port number from 8081 to 8085 in react-native module (${APP_ROOT}/node_modules/react-native)"

sed -i "" "s/localhost:8081/localhost:8085/g" "${APP_ROOT}/node_modules/react-native/React/React.xcodeproj/project.pbxproj"
sed -i "" "s/localhost 8081/localhost 8085/g" "${APP_ROOT}/node_modules/react-native/React/React.xcodeproj/project.pbxproj"
sed -i "" "s/Port 8081/Port 8085/g" "${APP_ROOT}/node_modules/react-native/React/React.xcodeproj/project.pbxproj"
sed -i "" "s/kRCTBundleURLProviderDefaultPort = 8081/kRCTBundleURLProviderDefaultPort = 8085/g" "${APP_ROOT}/node_modules/react-native/React/Base/RCTBundleURLProvider.m"
sed -i "" "s/\?: 8081/\?: 8085/g" "${APP_ROOT}/node_modules/react-native/Libraries/WebSocket/RCTWebSocketExecutor.m"
sed -i "" "s/default: 8081/default: 8085/g" "${APP_ROOT}/node_modules/react-native/local-cli/server/server.js"
