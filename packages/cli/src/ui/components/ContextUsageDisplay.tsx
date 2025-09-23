/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const ContextUsageDisplay = ({
  promptTokenCount,
  model,
}: {
  promptTokenCount: number;
  model: string;
}) => {

  if (process.env['IS_MINIMAL_UI_RENDERING'] == 'TRUE') {
    return <></>
  }

  return (<></>);
};
