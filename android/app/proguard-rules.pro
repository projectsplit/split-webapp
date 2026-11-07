# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Capacitor reads each plugin's name, methods and permission aliases from its annotations at runtime.
# R8 drops annotations whose types nothing keeps, and a plugin that has lost its @CapacitorPlugin
# reports no permissions at all, so push notifications could never be switched on.
-keep @interface com.getcapacitor.** { *; }

# Line numbers in crash reports. The bundle carries R8's mapping file, which Play uses to turn the
# obfuscated names back into real ones.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
