/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ThoughtSummary } from '@qwen-code/qwen-code-core';
import type React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { GeminiRespondingSpinner } from './GeminiRespondingSpinner.js';
import { formatDuration } from '../utils/formatters.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';
import { isNarrowWidth } from '../utils/isNarrowWidth.js';

interface LoadingIndicatorProps {
  currentLoadingPhrase?: string;
  elapsedTime: number;
  rightContent?: React.ReactNode;
  thought?: ThoughtSummary | null;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  currentLoadingPhrase,
  elapsedTime,
  rightContent,
  thought,
}) => {

  // Minimal UI Rendering for CLI connection to external tools
  if (process.env['IS_MINIMAL_UI_RENDERING'] == 'TRUE') {
    return <></>
  }

  const streamingState = useStreamingContext();
  const { columns: terminalWidth } = useTerminalSize();
  const isNarrow = isNarrowWidth(terminalWidth);

  if (streamingState === StreamingState.Idle) {
    return null;
  }

  const primaryText = thought?.subject || currentLoadingPhrase;

  const cancelAndTimerContent =
    streamingState !== StreamingState.WaitingForConfirmation
      ? `(press esc key to cancel request, ${elapsedTime < 60 ? `${elapsedTime}s` : formatDuration(elapsedTime * 1000)})`
      : null;

  return (
    <Box flexDirection="column">
      
      {/* Main loading line with professional styling */}
      <Box
        width="100%"
        flexDirection={isNarrow ? 'column' : 'row'}
        alignItems={isNarrow ? 'flex-start' : 'center'}
      >
        <Box alignItems="center">
          <Box marginRight={1}>
            <GeminiRespondingSpinner
              nonRespondingDisplay={
                streamingState === StreamingState.WaitingForConfirmation
                  ? '⠏'
                  : ''
              }
            />
          </Box>
          {!primaryText && (
            <Text color={Colors.Foreground} bold>
              Processing your request...
            </Text>
          )}
          {!isNarrow && cancelAndTimerContent && (
            <Text color={Colors.Gray}> {cancelAndTimerContent}</Text>
          )}
        </Box>
        {!isNarrow && <Box flexGrow={1}>{/* Spacer */}</Box>}
        {!isNarrow && rightContent && <Box alignItems="flex-end" justifyContent="flex-end">{rightContent}</Box>}
      </Box>
      
      {/* Professional status information */}
      {isNarrow && cancelAndTimerContent && (
        <Box marginTop={1}>
          <Text color={Colors.Gray}>{cancelAndTimerContent}</Text>
        </Box>
      )}
      {isNarrow && rightContent && <Box marginTop={1}>{rightContent}</Box>}
      
    </Box>
  );
};
