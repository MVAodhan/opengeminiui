import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <div className="w-full overflow-auto">
      <Highlight theme={themes.oneLight} code={code} language="tsx">
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock
