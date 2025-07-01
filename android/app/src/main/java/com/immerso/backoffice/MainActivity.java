package com.immerso.backoffice;

import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Configura la window per gestire correttamente la status bar
        Window window = getWindow();
        
        // IMPORTANTE: Status bar OPACA con colore di sfondo, NON trasparente
        window.setStatusBarColor(getColor(android.R.color.white)); // Status bar bianca opaca
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        
        // FONDAMENTALE: Impedisci alla WebView di andare sotto la status bar
        WindowCompat.setDecorFitsSystemWindows(window, true);
        
        // Testo scuro sulla status bar bianca
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, window.getDecorView());
        if (controller != null) {
            controller.setAppearanceLightStatusBars(true);
        }
    }
}
