/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';

interface WelcomeMessageProps {
  model: string;
  version: string;
  isFirstRun?: boolean;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  model,
  version,
  isFirstRun = false,
}) => {
  return (
    <Box 
      flexDirection="column"
      borderStyle="round"
      borderColor={Colors.AccentPurple}
      paddingX={2}
      paddingY={1}
      marginBottom={1}
      backgroundColor={Colors.Background}
    >
      <Box alignItems="center" marginBottom={1}>
        <Text color={Colors.AccentPurple} bold>
          🤖 Welcome to AI Assistant
        </Text>
      </Box>
      
      <Box flexDirection="column" alignItems="center">
        <Text color={Colors.Foreground}>
          Powered by {model} • Version {version}
        </Text>
        
        {isFirstRun && (
          <Box marginTop={1} alignItems="center">
            <Text color={Colors.AccentCyan} bold>
              🚀 Ready to assist you with your coding tasks!
            </Text>
          </Box>
        )}
        
        <Box marginTop={1} alignItems="center">
          <Text color={Colors.Gray} dimColor>
            Type your message or use /help for commands
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
