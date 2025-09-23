/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { type Config } from '@qwen-code/qwen-code-core';

interface TipsProps {
  config: Config;
}

export const Tips: React.FC<TipsProps> = ({ config }) => {
  return (
    <Box flexDirection="column" marginTop={1}>

      <Box flexDirection="column" alignItems="center">
        <Text color={Colors.Foreground}>
          Use <Text bold color={Colors.AccentPurple}>/help</Text> for commands and <Text bold color={Colors.AccentBlue}>@filename</Text> to reference files
        </Text>
        
        <Box marginTop={1} alignItems="center">
          <Text color={Colors.Gray} dimColor>
            Press <Text bold color={Colors.Gray}>Ctrl+C</Text> to cancel, <Text bold color={Colors.Gray}>Ctrl+D</Text> to exit
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
