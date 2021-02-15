/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Rumeur;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Simon
 */
public class Database 
{
    PrintWriter dos;
    
    public Database()
    {
        try 
        {
            dos = new PrintWriter(new BufferedWriter(new FileWriter("Données.txt" )));
        }
        catch (java.io.IOException e) {e.printStackTrace();}
    }
    
    public void ecrire(String o)
    {
        dos.println(o);
        dos.flush();
    }
    
    public ArrayList<String> lire(String fichier)
    {
        String ligne;
        ArrayList<String> chaine= new ArrayList<String>();
        try
        {
            InputStream ips=new FileInputStream(fichier); 
	    InputStreamReader ipsr=new InputStreamReader(ips);
	    BufferedReader br=new BufferedReader(ipsr);
            while ((ligne=br.readLine())!=null)chaine.add(ligne);
            br.close(); 
        }
        catch (Exception e)
        {
            System.out.println(e.toString());
	}
        return chaine;
    }
    
 
}
