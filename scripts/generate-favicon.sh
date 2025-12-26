#!/usr/bin/env sh
# Create a 32x32 PNG by drawing the glyph onto a transparent canvas.

magick -size 32x32 xc:none -background none -fill black \
	-font public/fonts/zpix.woff2 -pointsize 24 -gravity center \
	-annotate 0 "历" public/favicon.png