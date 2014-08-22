package com.me.project;

import javax.servlet.*;
import javax.servlet.http.*;

import java.io.*;
import org.apache.commons.fileupload.*;
import org.apache.commons.fileupload.util.*;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import com.amazonaws.auth.PropertiesCredentials;
import com.amazonaws.event.ProgressEvent;
import com.amazonaws.event.ProgressListener;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.Upload;
import com.me.project.UploadProgressListener;

public class UploadServlet extends HttpServlet{

	private static final long serialVersionUID = -7717396648124634557L;
	public static long getBytesTransferred;
	private static int percentDone = 0;
	private static long theContentLength = -1;
	static boolean isLocal = false;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	response.setContentType("text/event-stream");
	response.setCharacterEncoding("UTF-8");

	PrintWriter out = response.getWriter();

	String localPath = "/Users/ByeWebster/Desktop/TempFiles";
	String s3Path = "mobileweb/TestUpload(Bye)/";
	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	if(isMultipart){

	 try{
		 FileItemFactory factory = new DiskFileItemFactory();
		 ServletFileUpload upload = new ServletFileUpload(factory);
		 UploadProgressListener listener = new UploadProgressListener();
		 HttpSession session = request.getSession();
		 session.setAttribute("LISTENER", listener);
		 upload.setProgressListener(listener);

         FileItemIterator iter = upload.getItemIterator(request);
         FileItemStream item = null;
         String name = "";
         InputStream stream = null;

         while (iter.hasNext()){
            item = iter.next();
            name = item.getFieldName();
            stream = item.openStream();
           if(item.isFormField()){

        	   if(name.equals("toDirectory")) {

	       	    	if(Streams.asString(stream).equals("saveToLocal")) {

	       		   		isLocal = true;

	       	   		} else {

	       	   			isLocal = false;

	       	   		}

	       	    }

           	} else {

           		if(isLocal){

                    name = item.getName();
                    if(name != null && !"".equals(name)){
                    	byte[] bytes = IOUtils.toByteArray(stream);
                       String fileName = new File(item.getName()).getName();
                       File file = new File(localPath+"/"+fileName);
                       FileOutputStream fos = new FileOutputStream(file);
                       fos.write(bytes);
                       fos.close();

                    }

           		} else {

           			AmazonS3 s3Client = new AmazonS3Client(new PropertiesCredentials(UploadServlet.class.getResourceAsStream("AwsCredentials.properties")));
           			TransferManager tx = new TransferManager(s3Client);

           			byte[] bytes = IOUtils.toByteArray(stream);
           			String fileName = new File(item.getName()).getName();
           			Long contentLength = Long.valueOf(bytes.length);
           			theContentLength = contentLength;
           		    ObjectMetadata metadata = new ObjectMetadata();
           		    metadata.setContentLength(contentLength);
           	   		PutObjectRequest putObjectRequest = new PutObjectRequest("wpmedia-shared", s3Path+fileName, new ByteArrayInputStream(bytes), metadata);
           	   		final Upload myUpload = tx.upload(putObjectRequest);

           	   		myUpload.addProgressListener(new ProgressListener() {

           				public void progressChanged(ProgressEvent progressEvent) {

           					getBytesTransferred = myUpload.getProgress().getBytesTransferred();
           					percentDone = (int)myUpload.getProgress().getPercentTransferred();

           					if (progressEvent.getEventCode() == ProgressEvent.COMPLETED_EVENT_CODE) {
           			            System.out.println("Upload Complete !!!");
           			        } else if (progressEvent.getEventCode() == ProgressEvent.FAILED_EVENT_CODE) {
           			            System.out.println("Failed Upload !!!");
           			        }

           				}

           			});

           		}

              }

         }

     } catch(Exception e) {
    	 // TODO Auto-generated catch block
   	  	e.printStackTrace();

     }

   }

  }

	public static String getMessage() {
		if (theContentLength == -1) {
				return "" + percentDone + " of Unknown-Total bytes have been read.";
			} else {
				return "" + percentDone + "";
		}
	}

	public static boolean isLocal() {
		return isLocal;
	}

}
